import { Router } from "./utils/router.js"
import { HomeComponent } from "./components/home.js"
import { AboutComponent } from "./components/about.js"
import { ContactComponent } from "./components/contact.js"
import { loadConfig, getApiBaseUrl } from "./utils/config.js"

const router = new Router("app");

router.addRoute("home", new HomeComponent())
router.addRoute("about", new AboutComponent())
router.addRoute("contact", new ContactComponent())

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

function initializeRoute() {
  const hash = window.location.hash.substring(1);
  if (hash && router.hasRoute(hash)) {
    router.navigateTo(hash);
  } else {
    router.navigateTo("home");
  }
}

window.handleCredentialResponse = async function (response: any) {
  const jwt = response.credential;
  console.log("Google ID token:", jwt);

  try {
    const res = await fetch(`${getApiBaseUrl()}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken: jwt }),
    });

    if (!res.ok) throw new Error("Backend login failed");

    const data = await res.json();
    console.log("Signed in:", data);

    document.body.innerHTML += `<p>Signed in as ${data.accountId}</p>`;
    localStorage.setItem("accountId", data.accountId);
    localStorage.setItem("idToken", jwt);
  } catch (err) {
    console.error("Login failed", err);
    alert("Login failed. Please try again.");
  }
};

async function init() {
  try {
    await loadConfig(); 
    setupNavigation();
    initializeRoute();

    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.substring(1);
      if (hash && router.hasRoute(hash)) {
        router.navigateTo(hash);
      } else {
        router.navigateTo("home");
      }
    });
  } catch (e) {
    document.body.innerHTML = `<p style="color: red;">Failed to start app: ${e.message}</p>`;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
