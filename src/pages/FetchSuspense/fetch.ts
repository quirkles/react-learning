import axios, {AxiosResponse} from "axios";

export const fetchData = <T>(apiURL: string, artificialDelay: number = 2000): {read: () => T | void } => {
    let status = "pending";
    let result: T;

    let suspender = new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            axios(apiURL)
                .then((r: AxiosResponse<T>) => {
                    status = "success";
                    result = r.data;
                    resolve();
                })
                .catch((e) => {
                    status = "error";
                    result = e;
                    reject();
                });
        }, artificialDelay);
    });

    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        },
    };
};
