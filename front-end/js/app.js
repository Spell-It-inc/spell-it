/**
 * Main application file
 */

// Import necessary modules/functions
import { checkAuthState } from "./auth.js"
import { initRouter } from "./router.js"
import { initContactForm } from "./contact-form.js"
import { initDashboard } from "./dashboard.js"
import { $ } from "./utils.js" // Assuming $ is a utility function for DOM selection
import { signOut } from "./auth.js" // Import signOut function

// Initialize the application
function init() {
  // Check if user is already logged in (from localStorage)
  checkAuthState()

  // Initialize router
  initRouter()

  // Initialize page-specific functionality
  initContactForm()
  initDashboard()

  // Set up sign out button
  const signOutButton = $("sign-out-button")
  if (signOutButton) {
    signOutButton.addEventListener("click", signOut)
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", init)
