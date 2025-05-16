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

    container.replaceChildren();

    const heading = document.createElement('h1');
    heading.textContent = `Welcome ${this.user?.name ?? ''}`;
    container.appendChild(heading);

    const subtitle = document.createElement('p');
    subtitle.className = 'subtitle';
    subtitle.textContent = "Manage your young spellers’ profiles and cheer them on to success!";
    container.appendChild(subtitle);

    const profilesSection = document.createElement('section');
    profilesSection.id = 'profiles-list';

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading';
    loadingDiv.textContent = 'Loading profiles...';

    profilesSection.appendChild(loadingDiv);
    container.appendChild(profilesSection);

    const createBtn = document.createElement('button');
    createBtn.id = 'create-profile-button';
    createBtn.className = 'button';
    createBtn.textContent = 'Create Profile';
    createBtn.addEventListener('click', () => {
      this.router.navigateTo('create-profile');
    });
    container.appendChild(createBtn);

    this.renderProfilesList();
  }

  renderProfilesList() {
    const listSection = document.getElementById("profiles-list");
    if (!listSection) return;

    // Clear existing content
    listSection.replaceChildren();

    if (!this.profiles.length) {
      const noProfilesMsg = document.createElement("p");
      noProfilesMsg.textContent = "No profiles found.";
      listSection.appendChild(noProfilesMsg);
      return;
    }

    this.profiles.forEach(p => {
      const profileCard = document.createElement("a");
      profileCard.className = "profile-card";
      profileCard.href = `#profile/${p.profile_id}`;
      profileCard.setAttribute("aria-label", `View profile for ${p.username}`);
      profileCard.textContent = p.username;

      listSection.appendChild(profileCard);
    });
  }

  renderCreateProfileForm(container: HTMLElement) {
  container.replaceChildren();

  const heading = document.createElement('h2');
  heading.textContent = 'Create New Profile';

  const form = document.createElement('form');
  form.id = 'profile-form';

  const formGroup = document.createElement('div');
  formGroup.className = 'form-group';

  const label = document.createElement('label');
  label.htmlFor = 'username';
  label.textContent = 'Username';

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'username';
  input.name = 'username';
  input.required = true;

  formGroup.appendChild(label);
  formGroup.appendChild(input);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'cta-button';
  submitBtn.textContent = 'Submit';

  form.appendChild(formGroup);
  form.appendChild(submitBtn);

  container.appendChild(heading);
  container.appendChild(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = input.value.trim();

    const profile = { username };

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
      this.router.navigateTo('profiles');
    }
  });
}
}
