import { loadProfiles } from "./components/profiles";

(async () => {
  // Check if we are returning from Google OAuth (i.e., the URL has a `code` query parameter)
  const params = new URLSearchParams(window.location.search);
  if (!window.location.hash) {
    const signInButton = document.getElementById('google-login');
    if (signInButton && !sessionStorage.getItem('token')) {
      signInButton.innerHTML = "Login with Google";
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

  // If the URL has the authorization code, exchange it for a JWT token
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
      history.replaceState({}, '', '/'); // Remove the code from URL after successful login
      loadProfiles(); // Load user profiles after successful login
    }
  } else if (sessionStorage.getItem('token')) {
    loadProfiles(); // Load profiles if token is available in session
  }
})();
