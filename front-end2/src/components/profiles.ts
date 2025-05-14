import { Component } from "../utils/types";
import { Router } from "../utils/router.js";

export class ProfilesComponent implements Component {
  private profiles: any[] = [];
  private createProfileButton: HTMLElement | null = null;
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  async fetchProfiles(): Promise<void> {
    const response = await fetch(`${window.__ENV__.API_BASE_URL}api/profiles`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      this.profiles = data;
      this.renderProfiles();
    } else {
      console.error('Failed to fetch profiles');
    }
  }

  async createProfile(username: string, ageGroupId: number): Promise<void> {
    const profileData = {
      account_id: 1,
      username,
      age_group_id: ageGroupId
    };

    const response = await fetch(`${window.__ENV__.API_BASE_URL}api/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(profileData)
    });

    if (response.ok) {
      alert('Profile created successfully!');
      await this.fetchProfiles();
      this.router.navigateTo('profiles');
    } else {
      alert('Failed to create profile');
    }
  }

  renderCreateProfileForm(container: HTMLElement): void {
    container.innerHTML = `
      <section class="profile-form">
        <header>
          <h2>Create New Profile</h2>
        </header>
        <form id="profile-form">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required />
          
          <label for="age-group">Age Group:</label>
          <select id="age-group" name="age_group_id" required>
            <option value="1">4-6</option>
            <option value="2">7-9</option>
            <option value="3">10-12</option>
            <option value="4">13+</option>
          </select>
          
          <button type="submit" id="submit-profile-btn">Create Profile</button>
        </form>
      </section>
    `;

    const form = container.querySelector("#profile-form");
    if (form) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const usernameInput = form.querySelector("#username") as HTMLInputElement;
        const ageGroupSelect = form.querySelector("#age-group") as HTMLSelectElement;

        const username = usernameInput.value.trim();
        const ageGroupId = parseInt(ageGroupSelect.value);

        if (username) {
          await this.createProfile(username, ageGroupId);
        } else {
          alert("Please enter a valid username.");
        }
      });
    }
  }

  renderProfiles(): void {
    const profilesList = document.querySelector("#profiles-list");
    if (profilesList) {
      profilesList.innerHTML = this.profiles
        .map(profile => `
          <article class="profile-card">
            <header>
              <h3>${profile.username}</h3>
            </header>
            <p>Age Group: ${profile.age_group_id}</p>
            <button class="view-rewards-btn" data-profile-id="${profile.profile_id}">View Rewards</button>
          </article>
        `)
        .join('');

      document.querySelectorAll('.view-rewards-btn').forEach(button => {
        button.addEventListener("click", async (e: Event) => {
          const profileId = (e.target as HTMLElement).dataset.profileId;
          if (profileId) {
            const response = await fetch(`${window.__ENV__.API_BASE_URL}api/profiles/${profileId}/rewards`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
              }
            });
            const rewards = await response.json();
            alert(`Rewards for ${rewards.username}: ${rewards.rewards.map((r: any) => r.name).join(', ')}`);
          }
        });
      });
    }
  }

  async render(container: HTMLElement): Promise<void> {
    container.innerHTML = `
      <main class="profiles-page">
        <header>
          <h1>Your Profiles</h1>
        </header>
        <button id="create-profile-btn" class="cta-button">Create New Profile</button>
        <section id="profiles-list"></section>
      </main>
    `;

    this.createProfileButton = container.querySelector("#create-profile-btn");
    if (this.createProfileButton) {
      this.createProfileButton.addEventListener("click", () => {
        this.renderCreateProfileForm(container);
      });
    }

    await this.fetchProfiles();
  }
}
