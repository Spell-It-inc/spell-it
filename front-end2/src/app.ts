import { Router } from "./utils/router.js";
import { ProfilesComponent } from "./components/profiles.js";
import { ProfileComponent } from "./components/profile.js";
import { GameComponent } from "./components/game.js";
import { CategoriesComponent } from "./components/categories.js";
import { SessionLogsComponent } from "./components/sessionLogs.js";

const router = new Router("main");
const profilesComponent = new ProfilesComponent(router);

// Create navigation container
const navigationContainer = document.createElement("nav");
navigationContainer.className = "navigation-container";

// Create back button
const backButton = document.createElement("button");
backButton.className = "back-button";
backButton.innerHTML = "&larr;";
backButton.style.display = "none";
navigationContainer.appendChild(backButton);

// Add navigation container to the page
document.body.insertBefore(
  navigationContainer,
  document.getElementById("main")
);

// Handle back button click
backButton.addEventListener("click", () => {
  router.goBack();
  updateBackButtonVisibility();
});

function updateBackButtonVisibility() {
  backButton.style.display = router.canGoBack() ? "block" : "none";
}

// Add routes
router.addRoute("games", new CategoriesComponent());
router.addRoute("game", new GameComponent());
router.addRoute("session-logs", {
  render: (container: HTMLElement, param?: string) => {
    new SessionLogsComponent().render(container, param);
  },
});
router.addRoute("profiles", new ProfilesComponent(router));
router.addRoute("profile", new ProfileComponent());
router.addRoute("create-profile", {
  render: (container: HTMLElement) =>
    profilesComponent.renderCreateProfileForm(container),
});

if (!window.location.hash) {
  const params = new URLSearchParams(window.location.search);

  if (params.get("code")) {
    const response = await fetch(
      `${window.__ENV__.API_BASE_URL}api/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: params.get("code") }),
      }
    );

    if (response.ok) {
      const jwt = await response.json();
      sessionStorage.setItem("token", jwt.data.id_token);
    }
  }

  const token = sessionStorage.getItem("token");

  if (!token) {
    const page = document.getElementById("main");
    const loginSection = document.createElement("section");
    loginSection.className = "login-section";

    const addLogo = document.createElement("img");
    addLogo.src = "./assets/spell-it-logo.png";
    addLogo.alt = "Google logo";
    addLogo.className = "logo";
    loginSection.appendChild(addLogo);

    const loginTitle = document.createElement("h1");
    loginTitle.className = "app-title";
    const titleText = document.createTextNode("Spell-It");
    loginTitle.appendChild(titleText);
    loginSection.appendChild(loginTitle);

    const welcomeMessage = document.createElement("p");
    const message = document.createTextNode(
      "Learn to spell, one word at a time"
    );
    welcomeMessage.className = "app-tagline";
    welcomeMessage.appendChild(message);
    loginSection.appendChild(welcomeMessage);

    const signInButton = document.createElement("button");
    signInButton.id = "google-login";
    signInButton.className = "google-btn";
    signInButton.type = "button";

    const googleLogo = document.createElement("img");
    googleLogo.src = "https://developers.google.com/identity/images/g-logo.png";
    googleLogo.alt = "Google logo";
    signInButton.appendChild(googleLogo);

    const signInText = document.createTextNode("Sign in with Google");
    signInButton.appendChild(signInText);
    loginSection.appendChild(signInButton);

    const backgroundImg = document.createElement("img");
    backgroundImg.src = "./assets/dinosaur.png";
    backgroundImg.alt = "background image";
    backgroundImg.className = "login-background";

    loginSection.appendChild(backgroundImg);

    page.appendChild(loginSection);

    signInButton.addEventListener("click", () => {
      const params = new URLSearchParams({
        client_id: `${window.__ENV__.GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
        redirect_uri: window.__ENV__.REDIRECT_URI,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
      });
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    });
  } else {
    window.location.hash = "#profiles";
  }

  window.history.replaceState({}, document.title, window.location.pathname);
}

window.addEventListener("hashchange", () => {
  const route = window.location.hash.substring(1) || "profiles";
  router.navigateTo(route);
  updateBackButtonVisibility();
});

if (window.location.hash) {
  const route = window.location.hash.substring(1);
  router.navigateTo(route);
}
