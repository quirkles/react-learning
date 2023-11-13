import {useSessionUser} from "./sessionUserProvider";

export function Body(){
    const sessionUser = useSessionUser()
    return(
        <>
            {sessionUser ? <div>
                <h3>{sessionUser.name}</h3>
                <h2>{sessionUser.email}</h2>
                <h3>{sessionUser.id}</h3>
            </div> : <div>Nobody logged in</div>}
        </>
    )
}
