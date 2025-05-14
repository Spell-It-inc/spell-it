/**
 * SPA Router functionality
 */

// DOM Elements for routing
const navLinks = document.querySelectorAll(".nav-link")
const pages = document.querySelectorAll(".page")

// Mock authentication functions (replace with your actual authentication logic)
function isAuthenticated() {
  // Example: Check if a token exists in local storage
  return localStorage.getItem("token") !== null
}

function showNotification(message, type) {
  // Example: Display a notification using a library like Toastify or a custom element
  alert(`${type}: ${message}`)
}

function updateDashboardUserInfo() {
  // Example: Fetch user data and update the dashboard
  console.log("Updating dashboard user info")
}

// Initialize router
function initRouter() {
  // Set up navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const route = link.getAttribute("data-route")
      navigateTo(route)
    })
  })

  // Handle initial route
  handleRoute(window.location.hash.substring(1) || "home")

  // Listen for hash changes
  window.addEventListener("hashchange", () => {
    const route = window.location.hash.substring(1) || "home"
    handleRoute(route)
  })
}

// Navigate to a route
function navigateTo(route) {
  window.location.hash = route
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
  if (route === "dashboard" && !isAuthenticated()) {
    // Redirect to home if not authenticated
    window.location.hash = "home"
    showNotification("Please sign in to access the dashboard", "error")
    return
  }

  // If navigating to dashboard and user is authenticated, update user info
  if (route === "dashboard" && isAuthenticated()) {
    updateDashboardUserInfo()
  }
}
