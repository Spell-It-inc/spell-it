/**
 * Authentication related functionality
 */

// Application State
let currentUser = null
const google = undefined // Declare google variable

// Mock implementations (replace with actual implementations or imports)
function decodeJwtResponse(token) {
  // Placeholder implementation
  console.warn("decodeJwtResponse is a placeholder. Implement JWT decoding.")
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    )

    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding JWT:", error)
    return null
  }
}

function showNotification(message) {
  // Placeholder implementation
  alert(message)
  console.log("Notification:", message)
}

function $(selector) {
  // Placeholder implementation using querySelector
  return document.querySelector(selector)
}

function updateDashboardUserInfo() {
  // Placeholder implementation
  console.log("Updating dashboard user info (placeholder)")
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

  // Show welcome notification
  showNotification(`Welcome, ${currentUser.name}!`)
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
  const signInButton = document.querySelector(".g_id_signin")
  const signOutButton = $("sign-out-button")
  const dashboardLink = $("dashboard-link")

  if (currentUser) {
    // User is signed in
    if (signInButton) signInButton.style.display = "none"
    if (signOutButton) signOutButton.style.display = "block"
    if (dashboardLink) dashboardLink.style.display = "block"

    // Update dashboard user info if on dashboard page
    updateDashboardUserInfo()
  } else {
    // User is signed out
    if (signInButton) signInButton.style.display = "block"
    if (signOutButton) signOutButton.style.display = "none"
    if (dashboardLink) dashboardLink.style.display = "none"
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

  // Show notification
  showNotification("You have been signed out")
}

// Check if user is authenticated
function isAuthenticated() {
  return currentUser !== null
}

// Get current user
function getCurrentUser() {
  return currentUser
}
