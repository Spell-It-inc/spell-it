import type { Component } from "../utils/types";

export class SessionLogsComponent implements Component {
    async render(container: HTMLElement): Promise<void> {
        container.innerHTML = `
          <div class="page session-logs-page">
            <h1>🕹️ Your Game Adventures!</h1>
            <p>Here's a list of games you've played. Great job!</p>
            <div id="session-logs-list" class="logs-container">
              <div class="spinner"></div>
              <p>Loading your fun sessions... 🎉</p>
            </div>
          </div>
        `;

        try {
            const token = sessionStorage.getItem("token");
            const profileId = sessionStorage.getItem("profile_id");

            // Check for missing data
            if (!token || !profileId) {
                container.querySelector("#session-logs-list")!.innerHTML = `<p class="error">Please log in and select a profile to see your adventures!</p>`;
                return;
            }

            // Fetch session logs
            const response = await fetch(`${window.__ENV__.API_BASE_URL}api/profiles/${profileId}/session-logs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to fetch session logs");

            const logs = await response.json();
            const logsContainer = container.querySelector("#session-logs-list");

            if (!logsContainer) return;

            if (logs.length === 0) {
                logsContainer.innerHTML = `<p>No adventures yet! Time to play some games! 🧩</p>`;
            } else {
                logsContainer.innerHTML = logs.map((log: any) => `
                  <div class="log-entry">
                    <h3>🎮 ${log.game_name}</h3>
                    <p><strong>Category:</strong> ${log.category_name}</p>
                    <p><strong>Score:</strong> ⭐ ${log.score}</p>
                    <p><strong>Date:</strong> ${new Date(log.started_at).toLocaleDateString()}</p>
                  </div>
                `).join("");
            }
        } catch (error) {
            const logsContainer = container.querySelector("#session-logs-list");
            if (logsContainer) {
                logsContainer.innerHTML = `<p class="error">Oops! Something went wrong loading your logs. 😢</p>`;
            }
            console.error(error);
        }
    }
}