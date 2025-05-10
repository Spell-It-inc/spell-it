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
      e.preventDefault()
      const route = (e.currentTarget as HTMLElement).getAttribute("data-route")
      if (route) {
        router.navigateTo(route)
      }
    })
  })
}

// Set up navigation when DOM is loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupNavigation)
} else {
  // DOM already loaded, set up navigation immediately
  setupNavigation()
}

window.handleCredentialResponse = function(response) {
  console.log(response);
  const jwt = response.credential;
  console.log("JWT ID token: ", jwt);

  // Optional: Decode the JWT or send it to your server
  const payload = JSON.parse(atob(jwt.split('.')[1]));
  console.log("User Info:", payload);

  // Do something useful with the login (e.g., show user name)
  document.body.innerHTML += `<p>Signed in as ${payload.name}</p>`;
}

// Navigate to default route or route from URL hash
function initializeRoute() {
  const hash = window.location.hash.substring(1)
  if (hash && router.hasRoute(hash)) {
    router.navigateTo(hash)
  } else {
    router.navigateTo("home")
  }
}

// Initialize the route
initializeRoute()

// Handle hash changes
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1)
  if (hash && router.hasRoute(hash)) {
    router.navigateTo(hash)
  }
})