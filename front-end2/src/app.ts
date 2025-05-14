//SO like this is the home page login, we want to get a auth token and then exchange it for a jwt... so firstly let's create
//the button that get's the auth token
import { loadProfiles } from "./components/profiles";

(async () => {
  if (!window.location.hash) {
    const signInButton = document.getElementById('google-login');
    if (signInButton && !sessionStorage.getItem('token')) {
      signInButton.innerHTML = "Login with google";
      signInButton.addEventListener('click', () => {
        const params = new URLSearchParams({
          client_id: `${(window as any).__ENV__.GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
          redirect_uri: (window as any).__ENV__.REDIRECT_URI,
          response_type: 'code',
          scope: 'openid email profile',
          access_type: 'offline',
          prompt: 'consent'
        });
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
      });
    } else if (signInButton) {
      signInButton.innerHTML = "Proceed";
    }
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('code')) {
    const response = await fetch((window as any).__ENV__.API_BASE_URL + '/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code: params.get('code') })
    });

    if (response.ok) {
      const jwt = await response.json();
      sessionStorage.setItem('token', jwt.id_token);
      history.replaceState({}, '', '/'); 
      loadProfiles();
    }
  } else if (sessionStorage.getItem('token')) {
    loadProfiles();
  }
})();
// const jwtToken = sessionStorage.getItem('jwt') ?? (params.get('code'))
// const hash = window.location.hash

// if (authCode) {
//   window.history.replaceState({}, document.title, window.location.pathname);
//   sessionStorage.setItem('authToken', authCode)
//   document.getElementById('google-login').innerHTML = "Proceed"
// } else {
//   //If no auth code can be found, setup to login
  
  // document.getElementById('google-login').addEventListener('click', () => {
  //   const params = new URLSearchParams({
  //     client_id: `${CLIENT_ID}.apps.googleusercontent.com`,
  //     redirect_uri: REDIRECT_URI,
  //     response_type: 'code',
  //     scope: 'openid email profile',
  //     access_type: 'offline',
  //     prompt: 'consent'
  //   });
  //   window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
//   });
// }

// console.log(hash)
// console.log(params)
// console.log(authCode)