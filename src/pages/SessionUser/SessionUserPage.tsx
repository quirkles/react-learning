import {Header} from "./Header";
import {Body} from "./Body";
import {SessionUserProvider} from "./sessionUserProvider";

export function SessionUserPage() {
    return (
        <>
            <SessionUserProvider>
                <h2>Session user</h2>
                <Header></Header>
                <Body></Body>
            </SessionUserProvider>
        </>
    )
}
