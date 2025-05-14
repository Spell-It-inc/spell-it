export async function loadProfiles() {
  const token = sessionStorage.getItem('token');
  if (!token) return;

  const main = document.querySelector('main');
  if (!main) return;

  main.innerHTML = "<h1>Welcome</h1><p>Loading your profiles...</p>";

  const response = await fetch(`${(window as any).__ENV__.API_BASE_URL}/api/profiles`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    main.innerHTML = "<p>Failed to load profiles.</p>";
    return;
  }

  const profiles = await response.json();
  renderProfiles(profiles);
}

function renderProfiles(profiles: { id: string; name: string; }[]) {
  const main = document.querySelector('main');
  if (!main) return;

  main.innerHTML = `
    <h1>Your Profiles</h1>
    <div class="profiles-list"></div>
    <button id="create-profile" class="google-btn">+ Create New Profile</button>
  `;

  const list = main.querySelector('.profiles-list') as HTMLElement;

  profiles.forEach(profile => {
    const card = document.createElement('div');
    card.className = "profile-card";
    card.innerHTML = `
      <h2>${profile.name}</h2>
      <p>ID: ${profile.id}</p>
    `;
    card.addEventListener('click', () => {
      // You can adjust this to match your routing strategy
      window.location.href = `/profile.html?id=${profile.id}`;
    });
    list.appendChild(card);
  });

  const createButton = document.getElementById('create-profile');
  createButton?.addEventListener('click', async () => {
    const name = prompt("Enter a name for the new profile:");
    if (!name) return;

    const token = sessionStorage.getItem('token');
    const response = await fetch(`${(window as any).__ENV__.API_BASE_URL}/api/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name })
    });

    if (response.ok) {
      const newProfile = await response.json();
      renderProfiles([...profiles, newProfile]);
    } else {
      alert("Failed to create profile");
    }
  });
}
