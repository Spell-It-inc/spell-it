import { Component } from "../utils/types";

export class ProfileComponent implements Component {
  async render(container: HTMLElement): Promise<void> {
    const profileId = window.location.hash.split("/")[1];
    sessionStorage.setItem("profile_id", profileId);

    const header = document.createElement("header");
    const h1 = document.createElement("h1");
    h1.textContent = "Profile";
    header.appendChild(h1);
    container.appendChild(header);

    const profileDetailsSection = document.createElement("section");
    profileDetailsSection.className = "profile-details";
    container.appendChild(profileDetailsSection);

    const profile = await this.fetchProfile(parseInt(profileId));

    if (profileDetailsSection) {
      const joinedDate = new Date(profile.created_at);
      const month = joinedDate.toLocaleString("en-US", { month: "long" });
      const year = joinedDate.getFullYear();

      const usernamePara = document.createElement("p");
      const usernameLabel = document.createTextNode("Username: ");
      const usernameStrong = document.createElement("strong");
      usernameStrong.textContent = profile.username;
      usernamePara.appendChild(usernameLabel);
      usernamePara.appendChild(usernameStrong);

      const joinedPara = document.createElement("p");
      const joinedLabel = document.createTextNode("Joined ");
      const joinedStrong = document.createElement("strong");
      joinedStrong.textContent = `${month} ${year}`;
      joinedPara.appendChild(joinedLabel);
      joinedPara.appendChild(joinedStrong);

      profileDetailsSection.appendChild(usernamePara);
      profileDetailsSection.appendChild(joinedPara);
    }

    const navigation = document.createElement("ul");
    navigation.className = "profile-navigation";

    const sessionLogItem = document.createElement("li");
    const sessionLogLink = document.createElement("a");
    sessionLogLink.className = "btn";
    sessionLogLink.href = `#session-logs/${profile.profile_id}`;
    sessionLogLink.textContent = "View Sessions";
    sessionLogItem.appendChild(sessionLogLink);

    const gamesItem = document.createElement("li");
    const gamesLink = document.createElement("a");
    gamesLink.className = "btn";
    gamesLink.href = "#games";
    gamesLink.textContent = "Play A Game";
    gamesItem.appendChild(gamesLink);

    navigation.appendChild(sessionLogItem);
    navigation.appendChild(gamesItem);
    container.appendChild(navigation);

    const categoriesLink = navigation.querySelector("a[href='#categories']");
    if (categoriesLink) {
      categoriesLink.addEventListener("click", () => {
        window.history.pushState({}, "", "#categories");
        window.location.reload();
      });
    }
    const createProfileLink = navigation.querySelector(
      "a[href='#create-profile']"
    );
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
