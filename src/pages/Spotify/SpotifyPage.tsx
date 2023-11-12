import {useSpotify} from "../../hooks";
import {List} from "./List";
import {Login} from "./Login";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

export function SpotifyPage(){
    const [accessToken, initiateAuth, getToken] = useSpotify()
    const [searchParams, setUrlSearchParams] = useSearchParams()
    let code = searchParams.get("code");
    useEffect(() => {
        if(code) {
            try {
                getToken(code)
            } catch (err) {
                console.log(`Failed to get token: ${(err as Error).message}`)
                setUrlSearchParams({})
            } finally {
                setUrlSearchParams({})
            }
        }
    })
    return (
        <>
            <h1>Spotify</h1>
            {code ? <></> :accessToken ? <List accessToken={accessToken}/> : <Login initiateLogin={initiateAuth}/>}
        </>
    )
}
