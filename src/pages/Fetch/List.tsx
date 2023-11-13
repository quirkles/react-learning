import {useShowState} from "./showsProvider";
import {Loading} from "./Loading";

export function List() {
    const showState = useShowState()
    return (
        showState.isFetching ? <Loading></Loading> :
        <>
            <ul>
                {(showState.shows).map(s => (
                    <li key={s["show"]['id']}>{s.show.name}</li>
                ))}
            </ul>
        </>
    )
}
