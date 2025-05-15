import { Component } from "../utils/types";

export class ProfileComponent implements Component {
  async render(container: HTMLElement): Promise<void> {
    const profileId = window.location.hash.split("/")[1];
    sessionStorage.setItem('profile_id', profileId)
    container.innerHTML = `
        <header>
          <h1>Profile</h1>
        </header>
        <section class="profile-details">
        </section>
    `;

    const profile = await this.fetchProfile(parseInt(profileId));

    const profileElement = container.querySelector(".profile-details");
    if (profileElement) {
      const joinedDate = new Date(profile.created_at);
      const month = joinedDate.toLocaleString("en-US", { month: "long" });
      const year = joinedDate.getFullYear();
      profileElement.innerHTML = `
                <h3>${profile.username}</h3>
                <p>Joined <strong>${month} ${year}</strong></p>
                `;
    }

    const navigation = document.createElement("ul");
    navigation.className = "profile-navigation";
    navigation.innerHTML = `
            <li><a class="btn" href="#sessions">View Sessions</a></li>
            <li><a class="btn" href="#games">Play A Game</a></li>
        `;

    container.appendChild(navigation);

    const categoriesLink = navigation.querySelector("a[href='#categories']");
    if (categoriesLink) {
      categoriesLink.addEventListener("click", () => {
        window.history.pushState({}, "", "#categories");
        window.location.reload();
      });
    }
    const createProfileLink = navigation.querySelector("a[href='#create-profile']");
    if (createProfileLink) {
      createProfileLink.addEventListener("click", () => {
        window.history.pushState({}, "", "#create-profile");
        window.location.reload();
      });
    }
    

  }

  async fetchProfile(profileId: number) {
    const response = await fetch(
      window.__ENV__.API_BASE_URL + `api/profiles/${profileId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (response.ok) {
      const profile = await response.json();
      return profile;
    } else {
      console.error("Error fetching parofile:", response.statusText);
      return [];
    }
  }
}
