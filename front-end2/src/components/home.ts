import type { Component } from "../utils/types"

export class HomeComponent implements Component {
  render(container: HTMLElement): void {
    container.innerHTML = `
      <div class="page home-page">
        <h1>Hello SpellBuddy</h1>
        <p>This is a single page application built with vanilla TypeScript.</p>
        <div class="features">
          <div class="feature">
            <h3>No Framework</h3>
            <p>Built without React, Vue, or Angular</p>
          </div>
          <div class="feature">
            <h3>TypeScript</h3>
            <p>Type-safe JavaScript for better development</p>
          </div>
          <div class="feature">
            <h3>Component-Based</h3>
            <p>Modular architecture for maintainability</p>
          </div>
        </div>
        <button id="cta-button" class="cta-button">Get Started</button>
      </div>
    `

    // Add event listeners
    const ctaButton = container.querySelector("#cta-button")
    if (ctaButton) {
      ctaButton.addEventListener("click", () => {
        alert("Welcome to our app")
      })
    }
  }
}
