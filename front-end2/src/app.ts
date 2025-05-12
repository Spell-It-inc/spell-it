const API_BASE_URL = "http://ec2-13-247-176-10.af-south-1.compute.amazonaws.com:8080/api";

const usernameInput = document.getElementById("username") as HTMLInputElement;
const ageGroupSelect = document.getElementById("age-group") as HTMLSelectElement;
const googleSigninDiv = document.getElementById("google-signin");

function handleCredentialResponse(response: any) {
  const jwt = response.credential;
  console.log("Google ID token:", jwt);

  const username = usernameInput.value.trim();
  const ageGroup = ageGroupSelect.value;

  if (!username || !ageGroup) {
    alert("Please enter your name and select your age group before signing in.");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("ageGroup", ageGroup);

  fetch(`${API_BASE_URL}/auth/signin`, {
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

      alert("Login successful! Redirecting will be added soon.");
    })
    .catch((err) => {
      console.error("Login failed", err);
      alert("Login failed. Please try again.");
    });
}

function initializeGoogleSignIn() {
  if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.initialize({
      client_id: "249850029476-h2qpm8hqaa82r4ifbt4sij8f6s6qqs3e.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });

    if (googleSigninDiv) {
      window.google.accounts.id.renderButton(googleSigninDiv, {
        theme: "outline",
        size: "large",
        type: "standard"
      });
    }
  } else {
    console.error("Google Sign-In is not available.");
  }
}

window.addEventListener("DOMContentLoaded", initializeGoogleSignIn);
