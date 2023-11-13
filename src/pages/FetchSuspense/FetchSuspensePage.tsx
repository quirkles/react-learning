import {SearchBox} from "./SearchBox";
import {List} from "./List";
import React, {Suspense, useState} from "react";
import {Loading} from "./Loading";

export function FetchSuspensePage() {
    const [queryString, setQueryString] = useState('')
    return (
        <div>
            <h2>Fetch: {queryString}</h2>
            <div className="grid-x">
                <div className="cell">
                    <SearchBox
                        query={queryString}
                        onChange={(e) => setQueryString(e.target.value)}></SearchBox>
                </div>
                <div className="cell">
                    <Suspense fallback={<Loading/>}>
                        <List query={queryString}></List>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
