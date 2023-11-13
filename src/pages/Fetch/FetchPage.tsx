import {SearchBox} from "./SearchBox";
import {List} from "./List";
import {ShowProvider} from "./showsProvider";

export function FetchPage() {
    return (
        <ShowProvider>
        <div>
            <h2>Fetch</h2>
            <div className="grid-x">
                <div className="cell">
                    <SearchBox></SearchBox>
                </div>
                <div className="cell">
                        <List></List>
                </div>
            </div>
        </div>
        </ShowProvider>
    )
}
