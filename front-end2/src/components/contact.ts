import type { Component } from "../utils/types"

export class ContactComponent implements Component {
  render(container: HTMLElement): void {
    container.innerHTML = `
      <div class="page contact-page">
        <h1>Contact Us</h1>
        <p>Have questions or feedback? Reach out to us!</p>
        
        <form id="contact-form" class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          
          <button type="submit" class="submit-button">Send Message</button>
        </form>
        
        <div id="form-response" class="form-response"></div>
      </div>
    `

    // Add form submission handler
    const form = container.querySelector("#contact-form")
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const formResponse = container.querySelector("#form-response")

        if (formResponse) {
          formResponse.innerHTML = `
            <div class="success-message">
              <h3>Thank you for your message, ${formData.get("name")}!</h3>
              <p>We'll get back to you at ${formData.get("email")} as soon as possible.</p>
            </div>
          `
          ;(e.target as HTMLFormElement).reset()
        }
      })
    }
  }
}
