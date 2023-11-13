import {useEffect, useState} from "react";
import {fetchData} from "./fetch";

export function List(props: {
    query: string
}) {
    const [resource, setResource] = useState<{ read: () => unknown } | null>(null)

    useEffect(() => {
        setResource(null)
        if(props.query && props.query.length) {
            setResource(fetchData(`https://api.tvmaze.com/search/shows?q=${props.query}`))
        }
        return () => setResource({read: () => ([])})
    }, [props.query])
    const shows = resource?.read() || []
    return (
        <>
            <ul>
                {(shows as ShowResult[]).map(s => (
                    <li key={s["show"]['id']}>{s.show.name}</li>
                ))}
            </ul>
        </>
    )
}

interface ShowResult {
    "score": number,
    "show": {
        "id": number,
        "url": string,
        "name": string,
        "type": string,
        "language": string,
        "genres": string[],
        "status": string,
        "runtime": number,
        "averageRuntime": number,
        "premiered": string,
        "ended": string,
        "officialSite": null | string,
        "schedule": { "time": string, "days": [string] },
        "rating": { "average": null },
        "weight": number,
        "network": {
            "id": number,
            "name": string,
            "country": { "name": string, "code": string, "timezone": string },
            "officialSite": null | string
        },
        "webChannel": null | string,
        "dvdCountry": null | string,
        "externals": { "tvrage": null | string, "thetvdb": number | null, "imdb": null | string },
        "image": null,
        "summary": string,
        "updated": number,
        "_links": {
            "self": { "href": string },
            "previousepisode": { "href": string }
        }
    }
}
