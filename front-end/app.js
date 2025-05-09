// DOM Elements
const navLinks = document.querySelectorAll(".nav-link")
const pages = document.querySelectorAll(".page")
const dashboardLink = document.getElementById("dashboard-link")
const signOutButton = document.getElementById("sign-out-button")
const contactForm = document.getElementById("contact-form")
const userPicture = document.getElementById("user-picture")
const userName = document.getElementById("user-name")
const userEmail = document.getElementById("user-email")

// Application State
let currentUser = null

// Initialize the application
function init() {
  // Check if user is already logged in (from localStorage)
  checkAuthState()

  // Set up event listeners
  setupEventListeners()

  // Handle initial route
  handleRoute(window.location.hash.substring(1) || "home")

  // Set up navigation
  window.addEventListener("hashchange", () => {
    const route = window.location.hash.substring(1) || "home"
    handleRoute(route)
  })
}

// Set up event listeners
function setupEventListeners() {
  // Navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const route = link.getAttribute("data-route")
      window.location.hash = route
    })
  })

  // Sign out button
  signOutButton.addEventListener("click", signOut)

  // Contact form submission
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm)
  }
}

// Handle routing
function handleRoute(route) {
  // Hide all pages
  pages.forEach((page) => {
    page.style.display = "none"
  })

  // Show the active page
  const activePage = document.getElementById(`${route}-page`)
  if (activePage) {
    activePage.style.display = "block"
  } else {
    // Fallback to home if route doesn't exist
    document.getElementById("home-page").style.display = "block"
    window.location.hash = "home"
  }

  // Update active nav link
  navLinks.forEach((link) => {
    if (link.getAttribute("data-route") === route) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })

  // Check if user is trying to access protected route
  if (route === "dashboard" && !currentUser) {
    // Redirect to home if not authenticated
    window.location.hash = "home"
    alert("Please sign in to access the dashboard")
  }
}

// Google Auth callback
window.handleCredentialResponse = (response) => {
  // This function is called when the user successfully signs in with Google
  const credential = response.credential

  // Decode the JWT token to get user info
  const payload = decodeJwtResponse(credential)

  // Save user data
  currentUser = {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
    token: credential,
  }

  // Save to localStorage for persistence
  localStorage.setItem("user", JSON.stringify(currentUser))

  // Update UI
  updateAuthUI()

  // Redirect to dashboard
  window.location.hash = "dashboard"
}

// Decode JWT token
function decodeJwtResponse(token) {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  )

  return JSON.parse(jsonPayload)
}

// Check authentication state on page load
function checkAuthState() {
  const savedUser = localStorage.getItem("user")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    updateAuthUI()
  }
}

// Update UI based on authentication state
function updateAuthUI() {
  if (currentUser) {
    // User is signed in
    document.querySelector(".g_id_signin").style.display = "none"
    signOutButton.style.display = "block"
    dashboardLink.style.display = "block"

    // Update dashboard user info
    userPicture.src = currentUser.picture
    userName.textContent = currentUser.name
    userEmail.textContent = currentUser.email
  } else {
    // User is signed out
    document.querySelector(".g_id_signin").style.display = "block"
    signOutButton.style.display = "none"
    dashboardLink.style.display = "none"
  }
}

// Sign out function
function signOut() {
  // Clear user data
  currentUser = null
  localStorage.removeItem("user")

  // Update UI
  updateAuthUI()

  // Redirect to home
  window.location.hash = "home"

  // Revoke Google token
  if (google && google.accounts) {
    google.accounts.id.disableAutoSelect()
  }
}

// Handle contact form submission
function handleContactForm(e) {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const formValues = Object.fromEntries(formData.entries())

  // In a real app, you would send this data to your server
  console.log("Form submitted:", formValues)

  // Show success message
  alert("Message sent successfully!")

  // Reset form
  contactForm.reset()
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", init)

// Declare google variable
let google
