import {useState} from "react";

interface hookReturn<T, U extends unknown[]> {
    isFetching: boolean
    returnValue: T | null,
    error: Error | null,
    start: (...args: U) => void
}

export function useLoader<T, U extends unknown[]>(asyncFunc: (...args: U) => Promise<T>): hookReturn<T, U> {
    const [isFetching, setIsFetching] = useState(false)
    const [returnValue, setReturnValue] = useState<T | null>(null)
    const [error, setError] = useState<Error | null>(null)

    function start(...args: U) {
        setIsFetching(true)
        asyncFunc(...args)
            .then(resp => {
                setReturnValue(resp)
            })
            .catch(err => {
                setError(err)
            })
            .finally(() => {
                setIsFetching(false)
            })
    }
    return {
        isFetching, returnValue, error, start
    }
}
