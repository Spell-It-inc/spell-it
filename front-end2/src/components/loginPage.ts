import type { Component } from "../utils/types"
import { handleAuth, getTokenInfo, signout } from "../utils/auth.js"

export class LoginComponent implements Component {
    render(container: HTMLElement): void {
        const params = new URLSearchParams(window.location.search);
        if (params.get('code')) {
            handleAuth(params).then(info => {
                container.innerHTML = welcomeMessage(info)
                initLogoutButton();
            }).catch(err => signout())
        } else {
            if (sessionStorage.getItem('token') === undefined || sessionStorage.getItem('token') === null) { //NO TOKEN
                container.innerHTML = `<button id="google-login">Sign in with google</button>`
                initLogin();
            } else { //They are already logged in
                console.log("Already logged in")
                console.log("Token: ", sessionStorage.getItem('token'))
                getTokenInfo().then(info => {
                    container.innerHTML = welcomeMessage(info)
                    initLogoutButton();
                }).catch(err => signout())
            }
        }
    }
}

function welcomeMessage(info: any): string {
    return `
    <h1>Welcome</h1>
    <img class="profile-photo" src="${info.picture}" alt="" crossorigin="anonymous">
    <h1>${info.name}</h1>
    <nav class="navigation">
        <button id="signout-button">Sign out</button>
        <a href="#game">
        <button>Proceed</button>
        </a>
    </nav>
    `
}
function initLogin(): void {
    const signInButton = document.getElementById('google-login')
    signInButton.addEventListener('click', () => {
        const params = new URLSearchParams({
            client_id: `${window.__ENV__.GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
            redirect_uri: window.__ENV__.REDIRECT_URI,
            response_type: 'code',
            scope: 'openid email profile',
            access_type: 'offline',
            prompt: 'consent'
        });
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    });
}

function initLogoutButton(): void {
    console.log("initLogoutButton")
    const signOutButton = document.getElementById('signout-button')
    signOutButton.addEventListener('click', () => {
        signout()
    })
}