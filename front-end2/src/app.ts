const usernameInput = document.getElementById("username") as HTMLInputElement;
const ageGroupSelect = document.getElementById("age-group") as HTMLSelectElement;
const googleSigninBtn = document.getElementById("google-signin") as HTMLButtonElement;

googleSigninBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  const ageGroup = ageGroupSelect.value;

  if (!username || !ageGroup) {
    alert("Please enter your name and select your age group.");
    return;
  }

  // Store username and age group before redirect
  localStorage.setItem("username", username);
  localStorage.setItem("ageGroup", ageGroup);

  // Google sign-in logic
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.initialize({
      client_id: "249850029476-h2qpm8hqaa82r4ifbt4sij8f6s6qqs3e.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    window.google.accounts.id.prompt();  // Prompt the user to sign in
  } else {
    console.error("Google Sign-In is not available.");
  }
});

function handleCredentialResponse(response: any) {
  const jwt = response.credential;
  console.log("Google ID token:", jwt);

  // Send the JWT to your backend for validation
  fetch("/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ idToken: jwt })
  })
  .then((res) => res.json())
  .then((data) => {
    console.log("Signed in as", data.accountId);
    localStorage.setItem("accountId", data.accountId);
    localStorage.setItem("idToken", jwt);
    
    // Optionally store username and age group before redirecting
    window.location.href = "/dashboard.html";
  })
  .catch((err) => {
    console.error("Login failed", err);
    alert("Login failed. Please try again.");
  });
}
