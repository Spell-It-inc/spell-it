import { Router } from "../utils/router.js";

interface Profile {
  profile_id: string;
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
      <a class="profile-card" href="#profile/${p.profile_id}" aria-label="View profile for ${p.username}">
        ${p.username}
      </a>
    `).join("");
  }

  renderCreateProfileForm(container: HTMLElement) {
    container.innerHTML = `
      <h2>Create New Profile</h2>
      <form id="profile-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <button type="submit" class="cta-button">Submit</button>
      </form>
    `;

    const form = document.getElementById('profile-form') as HTMLFormElement;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const usernameInput = form.querySelector('#username') as HTMLInputElement;

      const profile = {
        username: usernameInput.value.trim(),
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
