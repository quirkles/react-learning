import {useLoader} from "../../hooks";
import {useEffect} from "react";

export function LoaderPage() {
    const promises = [
        useLoader(() => getAsyncProcess({rejectsWith: new Error("This one failed"), timeToResolveMs: 1000})),
        useLoader(() => getAsyncProcess({resolveValue: "Promise resolved", timeToResolveMs: 2000})),
        useLoader(() => getAsyncProcess({rejectsWith: new Error("This one failed"), timeToResolveMs: 3000})),
        useLoader(() => getAsyncProcess({rejectsWith: new Error("This one failed"), timeToResolveMs: 4000})),
        useLoader(() => getAsyncProcess({resolveValue: "Promise resolved", timeToResolveMs: 5000})),
    ]
    useEffect(() => {
        promises.map(p => p.start())
    }, [])

    return (
        <>
            <div className='grid-x'>
                {promises.map(({returnValue, error, isFetching}, i) => {
                    return(
                        <div className='cell' key={i}>
                            {isFetching ? <div>Loading....</div> : error ? <div>Error: {error.message}</div> : <div>Result: {JSON.stringify(returnValue)}</div>}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

function getAsyncProcess(params: {
    resolveValue: string | number | Record<string, unknown>,
    timeToResolveMs: number
    } | {
    rejectsWith: Error,
    timeToResolveMs: number
}): Promise<unknown> {
    if("resolveValue" in params) {
        return new Promise((res) => setTimeout(() => res(params.resolveValue), params.timeToResolveMs))
    }
        return new Promise((res, rej) => setTimeout(() => rej(params.rejectsWith), params.timeToResolveMs))
}
