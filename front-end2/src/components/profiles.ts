// src/components/profiles.ts
import { Component } from "../utils/types";
import { Router } from "../utils/router";

export class ProfilesComponent implements Component {
  private profiles: any[] = [];
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  async fetchProfiles(): Promise<void> {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${window.__ENV__.API_BASE_URL}api/profiles`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        this.profiles = data;
        this.renderProfiles();
      } else {
        const error = await response.json();
        console.error('Failed to fetch profiles:', error.message || response.statusText);
      }
    } catch (err) {
      console.error('Network error fetching profiles:', err);
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
      await this.fetchProfiles();
      this.router.navigateTo('profiles');
    } else {
      alert('Failed to create profile');
    }
  }

  renderCreateProfileForm(container: HTMLElement): void {
    container.innerHTML = `
      <main>
        <section class="profile-form">
          <header>
            <h2>Create New Profile</h2>
          </header>
          <form id="profile-form">
            <div class="form-group">
              <label for="username">Username</label>
              <input type="text" id="username" name="username" required />
            </div>
            
            <div class="form-group">
              <label for="age-group">Age Group</label>
              <select id="age-group" name="age_group_id" required>
                <option value="1">4-6 years</option>
                <option value="2">7-9 years</option>
                <option value="3">10-12 years</option>
                <option value="4">13+ years</option>
              </select>
            </div>
            
            <button type="submit" class="cta-button">Create Profile</button>
          </form>
        </section>
      </main>
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
      if (this.profiles.length === 0) {
        profilesList.innerHTML = `
          <p class="text-center">No profiles yet. <a href="#create-profile">Create your first profile</a></p>
        `;
        return;
      }

      profilesList.innerHTML = this.profiles
        .map(profile => `
          <a href="#session/${profile.profile_id}" class="profile-card">
            <h3>${profile.username}</h3>
          </a>
        `)
        .join('');
    }
  }

  async render(container: HTMLElement): Promise<void> {
    container.innerHTML = `
      <main>
        <header>
          <h1>Pick Your Player!</h1>
          <p class="subtitle">Get ready to become a spelling superstar! 🌟</p>
        </header>
        <section id="profiles-list">
          <div class="loading">Loading profiles...</div>
        </section>
      </main>
    `;

    await this.fetchProfiles();
  }
}
