import {doLogin, useSessionUser, useSessionUserDispatch} from "./sessionUserProvider";

export function Header(){
    const dispatch = useSessionUserDispatch()
    const sessionUser = useSessionUser()
    const handleLogin = () => doLogin().then(user => {
        if(dispatch) {
            dispatch({
                type: "LOGIN",
                user
            })
        }
    })
    return(
        <>
            <div className="top-bar">
                {sessionUser ?
                    <div className="top-bar-left">
                        Hello {sessionUser.name}
                    </div>: null
                }
                <div className="top-bar-right">
                    {sessionUser ?
                        <button className="button" onClick={() => dispatch && dispatch({type: 'LOGOUT'})}>Logout</button> :
                        <button className="button" onClick={handleLogin}>Login</button>
                    }
                </div>
            </div>
        </>
    )
}
