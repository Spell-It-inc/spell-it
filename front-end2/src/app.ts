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

  const signInButton = document.getElementById('google-login')
  if (sessionStorage.getItem('token') === undefined || sessionStorage.getItem('token') === null) { //NO TOKEN
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
    })
    const userInfo = await info.json()
    document.getElementsByTagName('main')[0].innerHTML = 
    `<h1>Welcome ${userInfo.name}</h1>
    <button id="google-login">Proceed</button>`
  }
  window.history.replaceState({}, document.title, window.location.pathname);
}


export { };
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