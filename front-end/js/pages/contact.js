/**
 * Contact page functionality
 */

// Import necessary modules (or declare variables)
import { $, showNotification } from "../utils.js" // Assuming these are in utils.js

// Handle contact form submission
function initContactForm() {
  const contactForm = $("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", handleContactForm)
  }
}

function handleContactForm(e) {
  e.preventDefault()

  const contactForm = $("contact-form")
  const formData = new FormData(contactForm)
  const formValues = Object.fromEntries(formData.entries())

  // In a real app, you would send this data to your server
  console.log("Form submitted:", formValues)

  // Show success message
  showNotification("Message sent successfully!")

  // Reset form
  contactForm.reset()
}
