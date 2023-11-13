interface Show {
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

export type ShowState = {
    shows: Show[];
    query: string;
    isFetching: boolean;
}


interface BaseAction {
    type: string
}

interface UpdateQuery extends BaseAction {
    type: 'UpdateQuery';
    query: string;
}

interface SetShows extends BaseAction {
    type: 'SetShows',
    shows: Show[]
}

interface SetIsFetching extends BaseAction {
    type: 'SetIsFetching',
    isFetching: boolean;
}

export type ShowAction = UpdateQuery | SetShows | SetIsFetching

export function showReducer(showState: ShowState, action: ShowAction): ShowState {
    switch (action.type){
        case "UpdateQuery":
            return {
                ...showState,
                query: action.query
            };
        case "SetShows":
            return {
                ...showState,
                shows: action.shows
            };
        case "SetIsFetching":
            return {
                ...showState,
                isFetching: action.isFetching
            };
    }
}
