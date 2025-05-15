import type { Component } from "../utils/types";

export class SessionLogsComponent implements Component {
  private logs: any[] = [];
  private containerEl: HTMLElement | null = null;

  async render(container: HTMLElement): Promise<void> {
    this.containerEl = container;

    container.innerHTML = `
      <div class="page session-logs-page">
        <h1>🕹️ Your Game Adventures!</h1>
        <p>Here's a list of games you've played. Great job!</p>
        <div id="session-logs-list" class="logs-container">
          <div class="logs-grid" id="logs-grid"></div>
        </div>
        <div style="text-align:center; margin: 2rem 0;">
          <button id="play-game-button" class="play-game-btn">🎯 Play Game</button>
        </div>
      </div>
    `;

    const playButton = container.querySelector("#play-game-button");
    playButton?.addEventListener("click", () => {
      alert("Game starting soon! 🚀");
    });

    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        this.showError("Please log in and select a profile to see your adventures!");
        return;
      }

      const response = await fetch(`${window.__ENV__.API_BASE_URL}api/profiles/1/session-logs`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to fetch session logs");

      this.logs = await response.json();
      this.renderAllLogs(); // Render everything at once
    } catch (error) {
      console.error(error);
      this.showError("Oops! Something went wrong loading your logs. 😢");
    }
  }

  private renderAllLogs() {
    const grid = this.containerEl?.querySelector("#logs-grid");
    if (!grid) return;

    grid.innerHTML = ""; // Clear previous logs

    if (this.logs.length === 0) {
      grid.innerHTML = "<p>No logs available.</p>";
      return;
    }

    this.logs.forEach(log => {
      const logHTML = document.createElement("div");
      logHTML.className = "log-entry";
      logHTML.innerHTML = `
        <h3>🎮 ${log.game_name}</h3>
        <p><strong>Category:</strong> ${log.category_name}</p>
        <p><strong>Score:</strong> ⭐ ${log.score}</p>
        <p><strong>Date:</strong> ${new Date(log.started_at).toLocaleDateString()}</p>
      `;
      grid.appendChild(logHTML);
    });
  }

  private showError(message: string) {
    const logsContainer = this.containerEl?.querySelector("#session-logs-list");
    if (logsContainer) {
      logsContainer.innerHTML = `<p class="error">${message}</p>`;
    }
  }
}