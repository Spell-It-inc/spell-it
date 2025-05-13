const API_BASE_URL = "http://ec2-13-247-176-10.af-south-1.compute.amazonaws.com:8080/api";

const usernameInput = document.getElementById("username") as HTMLInputElement;
const ageGroupSelect = document.getElementById("age-group") as HTMLSelectElement;

window.handleCredentialResponse = function(response: any) {
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
