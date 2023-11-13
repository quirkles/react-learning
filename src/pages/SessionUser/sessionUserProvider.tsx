import {createContext, Dispatch, PropsWithChildren, useContext, useReducer} from "react";
import {SessionUser, SessionUserAction, sessionUserReducer, SessionUserState} from "./sessionUserReducer";
import {v4} from "uuid";

export const SessionUserContext = createContext<SessionUserState>(null)
export const SessionUserDispatchContext = createContext<Dispatch<SessionUserAction> | null>(null)


export function SessionUserProvider(props: PropsWithChildren) {
    const [sessionUser, dispatch] = useReducer(sessionUserReducer, null);

    return (
        <SessionUserContext.Provider value={sessionUser}>
            <SessionUserDispatchContext.Provider value={dispatch}>
                {props.children}
            </SessionUserDispatchContext.Provider>
        </SessionUserContext.Provider>
    );
}

export function useSessionUser() {
    return useContext(SessionUserContext);
}

export function useSessionUserDispatch() {
    return useContext(SessionUserDispatchContext);
}

export function doLogin(): Promise<SessionUser> {
    return new Promise((res) => setTimeout(() => res({
        id: v4(),
        name: 'Alex',
        email: 'al.quirk@mail.com'
    }), 1500))
}
