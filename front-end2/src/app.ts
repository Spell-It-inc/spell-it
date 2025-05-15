import { Router } from "./utils/router.js";
import { ProfilesComponent } from "./components/profiles.js";
import { ProfileComponent } from "./components/profile.js";
import { GameComponent } from "./components/game.js";
import { CategoriesComponent } from "./components/categories.js";

const router = new Router('main');
const profilesComponent = new ProfilesComponent(router);

router.addRoute('games',new CategoriesComponent)
router.addRoute('game',new GameComponent)

router.addRoute('profiles', profilesComponent);
router.addRoute('profile', new ProfileComponent());
router.addRoute('create-profile', {
  render: (container: HTMLElement) => profilesComponent.renderCreateProfileForm(container)
});

if (!window.location.hash) {
  const params = new URLSearchParams(window.location.search);

  if (params.get('code')) {
    const response = await fetch(`${window.__ENV__.API_BASE_URL}api/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: params.get('code') })
    });

    if (response.ok) {
      const jwt = await response.json();
      sessionStorage.setItem('token', jwt.data.id_token);
    }
  }

  const token = sessionStorage.getItem('token');

  if (!token) {
    const signInButton = document.getElementById('google-login');
    signInButton.innerHTML = "Login with Google";
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
  } else {
    window.location.hash = '#profiles';
  }

  window.history.replaceState({}, document.title, window.location.pathname);
}

window.addEventListener("hashchange", () => {
  const route = window.location.hash.substring(1) || "profiles";
  router.navigateTo(route);
});

if (window.location.hash) {
  const route = window.location.hash.substring(1);
  router.navigateTo(route);
}
