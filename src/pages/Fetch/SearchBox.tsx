import {useEffect, useRef} from "react";
import {searchForShows, useShowDispatch, useShowState} from "./showsProvider";

export function SearchBox() {
    const showState = useShowState()
    const showDispatch = useShowDispatch()
    const lastQuery = useRef('')
    useEffect(() => {
        lastQuery.current = showState.query
        if(showDispatch){
            showDispatch({type: "SetShows",shows: []})
            if(showState.query.length) {
                showDispatch({type: "SetIsFetching", isFetching: true})
                searchForShows(showState.query).then((shows) => {
                    if(lastQuery.current === showState.query) {
                        showDispatch({type: "SetShows", shows})
                        showDispatch({type: "SetIsFetching", isFetching: false})
                    }
                })
            } else {
                showDispatch({type: "SetIsFetching", isFetching: false})
            }
        }
    }, [showState.query, showDispatch]);
    return(
        <>
            <label>Search
                <input
                    value={showState.query}
                    onChange={(e) => {showDispatch && showDispatch({type: "UpdateQuery", query: e.target.value})}}
                        type="text"
                        placeholder=""/>
            </label>
        </>
    )
}
