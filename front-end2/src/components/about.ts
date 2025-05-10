import type { Component } from "../types"

export class AboutComponent implements Component {
  render(container: HTMLElement): void {
    container.innerHTML = `
      <div class="page about-page">
        <h1>About This Project</h1>
        <p>This is a demonstration of how to build a Single Page Application using vanilla TypeScript without any frameworks.</p>
        <div class="about-content">
          <h2>Why Vanilla JS?</h2>
          <p>While frameworks like React, Vue, and Angular offer powerful features, understanding the fundamentals of vanilla JavaScript and TypeScript provides a solid foundation for web development.</p>
          
          <h2>Key Concepts Demonstrated</h2>
          <ul>
            <li>TypeScript for type safety</li>
            <li>Component-based architecture</li>
            <li>Client-side routing</li>
            <li>DOM manipulation</li>
            <li>Event handling</li>
          </ul>
        </div>
      </div>
    `
  }
}
