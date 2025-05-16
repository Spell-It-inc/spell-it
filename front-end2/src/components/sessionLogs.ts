import type { Component } from "../utils/types";

export class SessionLogsComponent implements Component {
  private logs: any[] = [];
  private containerEl: HTMLElement | null = null;
  private profileId: number | null = null;

  async render(container: HTMLElement, param?: string): Promise<void> {
    this.containerEl = container;

    if (!param) {
      const errorP = document.createElement('p');
      errorP.className = 'error';
      errorP.textContent = 'Missing profile ID.';
      container.appendChild(errorP);
      return;
    }

    this.profileId = parseInt(param);
    container.replaceChildren();

    const pageDiv = document.createElement('div');
    pageDiv.className = 'page session-logs-page';

    const title = document.createElement('h1');
    title.textContent = '🕹️ Your Game Adventures!';
    pageDiv.appendChild(title);

    const subtitle = document.createElement('p');
    subtitle.textContent = "Here's a list of games you've played. Great job!";
    pageDiv.appendChild(subtitle);

    const logsContainer = document.createElement('div');
    logsContainer.id = 'session-logs-list';
    logsContainer.className = 'logs-container';

    const logsGrid = document.createElement('div');
    logsGrid.className = 'logs-grid';
    logsGrid.id = 'logs-grid';
    logsContainer.appendChild(logsGrid);
    pageDiv.appendChild(logsContainer);

    const buttonContainer = document.createElement('div');
    buttonContainer.style.textAlign = 'center';
    buttonContainer.style.margin = '2rem 0';

    const playGameLink = document.createElement('a');
    playGameLink.id = 'play-game-button';
    playGameLink.href = '#games';
    playGameLink.textContent = '🎯 Play Game';
    buttonContainer.appendChild(playGameLink);
    pageDiv.appendChild(buttonContainer);

    container.appendChild(pageDiv);

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        this.showError("Please log in and select a profile to see your adventures!");
        return;
      }

      const response = await fetch(`${window.__ENV__.API_BASE_URL}api/profiles/${this.profileId}/session-logs`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Failed to fetch session logs");

      this.logs = await response.json();
      this.renderAllLogs();
    } catch (error) {
      console.error(error);
      this.showError("Oops! Something went wrong loading your logs. 😢");
    }
  }

  private renderAllLogs() {
    const grid = this.containerEl?.querySelector("#logs-grid");
    if (!grid) return;

    grid.replaceChildren();

    if (this.logs.length === 0) {
      const noLogsMsg = document.createElement('p');
      noLogsMsg.textContent = 'No logs available.';
      grid.appendChild(noLogsMsg);
      return;
    }

    this.logs.forEach(log => {
      const logEntry = document.createElement('div');
      logEntry.className = 'log-entry';

      const title = document.createElement('h3');
      title.textContent = `🎮 ${log.game_name}`;
      logEntry.appendChild(title);

      const categoryP = document.createElement('p');
      const categoryStrong = document.createElement('strong');
      categoryStrong.textContent = 'Category: ';
      categoryP.appendChild(categoryStrong);
      categoryP.appendChild(document.createTextNode(log.category_name));
      logEntry.appendChild(categoryP);

      const scoreP = document.createElement('p');
      const scoreStrong = document.createElement('strong');
      scoreStrong.textContent = 'Score: ';
      scoreP.appendChild(scoreStrong);
      scoreP.appendChild(document.createTextNode(`⭐ ${log.score}`));
      logEntry.appendChild(scoreP);

      const dateP = document.createElement('p');
      const dateStrong = document.createElement('strong');
      dateStrong.textContent = 'Date: ';
      dateP.appendChild(dateStrong);
      dateP.appendChild(document.createTextNode(new Date(log.started_at).toLocaleDateString()));
      logEntry.appendChild(dateP);

      grid.appendChild(logEntry);
    });
  }

  private showError(message: string) {
    const logsContainer = this.containerEl?.querySelector("#session-logs-list");
    if (logsContainer) {
      logsContainer.replaceChildren();
      const errorP = document.createElement('p');
      errorP.className = 'error';
      errorP.textContent = message;
      logsContainer.appendChild(errorP);
    }
  }
}