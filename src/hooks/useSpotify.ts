import {useState} from "react";
import {getAuthComponents} from "../pages/Spotify/auth";

const clientId = 'c5f2441b768b418b817352df24667993';
const redirectUri = 'http://localhost:3000/spotify';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

let IS_REQUESTING_TOKEN = false

export function useSpotify(): [string | null, () => Promise<void>, (code: string) => void] {
    const [accessToken, setAccessToken] = useState(null);

    async function initialiseLogin() {
        const {codeVerifier, codeChallenge} = await getAuthComponents()

        window.localStorage.setItem('code_verifier', codeVerifier);
        const params = {
            response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    }

    function requestToken(code: string) {
        if (IS_REQUESTING_TOKEN) {
            return
        }
        IS_REQUESTING_TOKEN = true
        // stored in the previous step
        let codeVerifier = localStorage.getItem('code_verifier');
        if (!codeVerifier) {
            throw new Error("Failed to find code verifier in local storage")
        }

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier,
            }),
        }

        fetch("https://accounts.spotify.com/api/token", payload).then(body => {
            return body.json()
        }).then(response => {
            localStorage.removeItem('code_verifier');
            localStorage.setItem('access_token', response.access_token);
            setAccessToken(response.access_token)
            IS_REQUESTING_TOKEN = false
        }).catch(() => {
            IS_REQUESTING_TOKEN = false
        });
    }

    return [accessToken, initialiseLogin, requestToken];
}
