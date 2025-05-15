import { Router } from "./utils/router.js";
import { ProfilesComponent } from "./components/profiles.js";

const router = new Router('main')
router.addRoute('profiles', new ProfilesComponent(router));

if (!window.location.hash) {
  const params = new URLSearchParams(window.location.search);
  if (params.get('code')) {
    console.log(params.get('code'))
    console.log(window.__ENV__.API_BASE_URL+'api/auth/signin')
    const response = await fetch(window.__ENV__.API_BASE_URL+'api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({code:params.get('code')})
    })
    if(response.ok){
      const jwt = await response.json();
      sessionStorage.setItem('token', jwt.data.id_token)
    }
  }

  if (sessionStorage.getItem('token') === undefined || sessionStorage.getItem('token') === null) { //NO TOKEN
    const signInButton = document.getElementById('google-login')
    signInButton.innerHTML = "Login with google";
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
  } else { // THERE IS A TOKEN
    const info = await fetch(window.__ENV__.API_BASE_URL+'api/auth/token-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token:sessionStorage.getItem('token')})
    });
    const userInfo = await info.json();

    document.getElementsByTagName('main')[0].innerHTML = `
      <h1>Welcome ${userInfo.name}</h1>
      <p class="subtitle">Manage your child's profiles and help them learn to spell.</p>
      <a href="#" class="nav-link" data-route="profiles">Go to Your Profile(s)</a>
    `;
  }
  window.history.replaceState({}, document.title, window.location.pathname);
}

window.addEventListener("hashchange", () => {
  const route = window.location.hash.substring(1) || "profiles";
  router.navigateTo(route);
});
