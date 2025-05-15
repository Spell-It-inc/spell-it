import type { Component } from "../utils/types"

export class GameComponent implements Component {
  render(container: HTMLElement): void {
    container.innerHTML = `
    <h1>Complete The Word</h1>
    <sec id = "word-container">
    `
  }
}