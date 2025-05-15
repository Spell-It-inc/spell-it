import { Router } from "../utils/router.js";

interface Profile {
  id: string;
  username: string;
  age_group: string;
}

interface UserInfo {
  name: string;
}

export class ProfilesComponent {
  private profiles: Profile[] = [];
  private user: UserInfo | null = null;
  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  async fetchProfiles() {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${window.__ENV__.API_BASE_URL}api/profiles`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      this.profiles = await response.json();
    }
  }

  async fetchUserInfo() {
    const token = sessionStorage.getItem('token');
    const response = await fetch(`${window.__ENV__.API_BASE_URL}api/auth/token-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });

    if (response.ok) {
      this.user = await response.json();
    }
  }

  async render(container: HTMLElement) {
    await this.fetchUserInfo();
    await this.fetchProfiles();

    container.innerHTML = `
      <h1>Welcome ${this.user?.name ?? ''}</h1>
      <p class="subtitle">Manage your young spellers’ profiles and cheer them on to success!</p>
      <section id="profiles-list">
        <div class="loading">Loading profiles...</div>
      </section>
      <button id="create-profile-button" class="button">Create Profile</button>
    `;

    const createBtn = document.getElementById("create-profile-button");
    createBtn?.addEventListener("click", () => {
      this.router.navigateTo("create-profile");
    });

    this.renderProfilesList();
  }

  renderProfilesList() {
    const listSection = document.getElementById("profiles-list");

    if (!this.profiles.length) {
      listSection!.innerHTML = `<p>No profiles found.</p>`;
      return;
    }

    listSection!.innerHTML = this.profiles.map(p => `
      <button class="profile-card" data-id="${p.id}" aria-label="View profile for ${p.username}">
        ${p.username}
      </button>
    `).join("");

    listSection!.querySelectorAll('.profile-card').forEach(button => {
      button.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset.id;
        if (id) {
          this.router.navigateTo(`profile/${id}`);
        }
      });
    });
  }

  renderCreateProfileForm(container: HTMLElement) {
    container.innerHTML = `
      <h2>Create New Profile</h2>
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
        <button type="submit" class="cta-button">Submit</button>
      </form>
    `;

    const form = document.getElementById('profile-form') as HTMLFormElement;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const usernameInput = form.querySelector('#username') as HTMLInputElement;
      const ageGroupSelect = form.querySelector('#age-group') as HTMLSelectElement;

      const profile = {
        username: usernameInput.value.trim(),
        age_group_id: parseInt(ageGroupSelect.value)
      };

      const response = await fetch(`${window.__ENV__.API_BASE_URL}api/profiles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(profile)
      });

      if (response.ok) {
        await this.fetchProfiles();
        this.router.navigateTo("profiles");
      }
    });
  }
}
