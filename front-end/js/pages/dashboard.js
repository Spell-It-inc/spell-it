/**
 * Dashboard page functionality
 */

// Mock functions (replace with actual implementations or imports)
const $ = (selector) => document.getElementById(selector)
const getCurrentUser = () => ({
  picture: "https://via.placeholder.com/150",
  name: "John Doe",
  email: "john.doe@example.com",
})
const showNotification = (message) => alert(message)

// Update dashboard user info
function updateDashboardUserInfo() {
  const userPicture = $("user-picture")
  const userName = $("user-name")
  const userEmail = $("user-email")

  if (!userPicture || !userName || !userEmail) return

  const user = getCurrentUser()

  if (user) {
    userPicture.src = user.picture
    userName.textContent = user.name
    userEmail.textContent = user.email
  }
}

// Initialize dashboard functionality
function initDashboard() {
  // Add event listeners for dashboard buttons
  const dashboardButtons = document.querySelectorAll("#dashboard-page .btn")

  dashboardButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const action = this.textContent.trim()

      if (action === "Edit Profile") {
        showNotification("Profile editing will be available soon!")
      } else if (action === "View Settings") {
        showNotification("Settings will be available soon!")
      }
    })
  })
}
