import {createContext, Dispatch, PropsWithChildren, useContext, useReducer} from "react";
import {ShowAction, showReducer, ShowState} from "./showsReducer";
import axios from "axios";

let initialState = {
    query: '',
    shows: [],
    isFetching: false
};
export const ShowContext = createContext<ShowState>(initialState)
export const ShowDispatchContext = createContext<Dispatch<ShowAction> | null>(null)


export function ShowProvider(props: PropsWithChildren) {
    const [showState, dispatch] = useReducer(showReducer, initialState);

    return (
        <ShowContext.Provider value={showState}>
        <ShowDispatchContext.Provider value={dispatch}>
            {props.children}
        </ShowDispatchContext.Provider>
        </ShowContext.Provider>
    );
}

export function useShowState() {
    return useContext(ShowContext);
}

export function useShowDispatch() {
    return useContext(ShowDispatchContext);
}

export function searchForShows(query: string): Promise<ShowState["shows"]> {
    return sleep()
        .then(() => axios(`https://api.tvmaze.com/search/shows?q=${query}`))
        .then(resp => resp.data)
}

function sleep(ms: number = 1250) {
    return new Promise((resolve, reject) => {
        return setTimeout(resolve, ms)
    })
}
