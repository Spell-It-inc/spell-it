import { Router } from "./utils/router.js"
import { HomeComponent } from "./components/home.js"
import { AboutComponent } from "./components/about.js"
import { ContactComponent } from "./components/contact.js"

// Initialize the router
const router = new Router("app")

// Register routes
router.addRoute("home", new HomeComponent())
router.addRoute("about", new AboutComponent())
router.addRoute("contact", new ContactComponent())

// Function to set up navigation
function setupNavigation() {
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const route = (e.currentTarget as HTMLElement).getAttribute("data-route")
      if (route) {
        router.navigateTo(route)
      }
    })
  })
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupNavigation)
} else {
  setupNavigation()
}

// Update this with your actual EC2 public IP or domain (with http/https)
const API_URL = "https://your-ec2-domain.com/api/auth/signin"; // ← Replace this

// Google Sign-In callback
window.handleCredentialResponse = async function (response) {
  const jwt = response.credential;
  console.log("Google ID token:", jwt);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ idToken: jwt })
    });

    if (!res.ok) throw new Error("Backend login failed");

    const data = await res.json();
    console.log("Signed in:", data);

    // Display info or store tokens
    document.body.innerHTML += `<p>Signed in as ${data.accountId}</p>`;
    localStorage.setItem("accountId", data.accountId);
    localStorage.setItem("idToken", jwt);

  } catch (err) {
    console.error("Login failed", err);
    alert("Login failed. Please try again.");
  }
};

// Route initialization
function initializeRoute() {
  const hash = window.location.hash.substring(1)
  if (hash && router.hasRoute(hash)) {
    router.navigateTo(hash)
  } else {
    router.navigateTo("home")
  }
}

initializeRoute()

// Handle hash changes
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1)
  if (hash && router.hasRoute(hash)) {
    router.navigateTo(hash)
  }
})
