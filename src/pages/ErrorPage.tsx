import { useRouteError } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    const message = (error as Record<string, string>)["statusText"] || (error as Error).message || "Unknown Error"
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{message}</i>
            </p>
        </div>
    );
}
