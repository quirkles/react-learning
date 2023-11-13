import {ChangeEvent} from "react";

export function SearchBox(props: {query: string, onChange: (e:ChangeEvent<HTMLInputElement>) => void}) {
    return(
        <>
            <label>Search
                <input value={props.query} onChange={props.onChange} type="text" placeholder=""/>
            </label>
        </>
    )
}
