import type { Component } from "../utils/types";

export class CategoryComponent implements Component {
  async render(container: HTMLElement): Promise<void> {
    container.innerHTML = `
      <section class="category-details"></section>
    `;

    const categoryId = window.location.hash.split("/")[1];
    if (categoryId) {
      try {
        const category = await this.fetchCategory(parseInt(categoryId));
        const categoryElement = container.querySelector(".category-details");
        if (categoryElement) {
          categoryElement.innerHTML = `
                <h2>${category.name}</h2>
                <section class="words-count-container">
                <p>
                <label for="words-count">Words Count:</label>
                    <input type="number"
                     id="words-count" min="${category.pagination.itemCount}" max="${category.pagination.totalItems}" value="${category.pagination.itemCount}" 
                     class="words-count" />
                </p>
                </section>
                <section class="quiz-actions">
                    <button class="btn btn-cancel" id="cancel">Cancel</button>
                    <button class="btn btn-primary" id="start-quiz">Start Quiz</button>
                </section>
                `;

          const cancelButton = categoryElement.querySelector("#cancel");
          cancelButton?.addEventListener("click", () => {
            window.history.back();
          });
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }
  }

  async fetchCategory(categoryId: number) {
    const response = await fetch(
      window.__ENV__.API_BASE_URL + `api/categories/${categoryId}/words`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (response.ok) {
      const category = await response.json();
      return category;
    } else {
      console.error("Error fetching category:", response.statusText);
      return [];
    }
  }
}
