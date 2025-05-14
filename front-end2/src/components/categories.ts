import type { Component } from "../utils/types";

export class CategoriesComponent implements Component {
  async render(container: HTMLElement): Promise<void> {
    container.innerHTML = `
      <section>
        <h1>Choose A Category</h1>

        <section class="categories">
        </section>
      </section>
    `;

    await this.fetchCategories()
      .then((categories) => {
        const categoriesContainer = container.querySelector(".categories");
        categoriesContainer.innerHTML = ""; // Clear previous content
        if (categoriesContainer) {
          categories.forEach((category) => {
            const categoryElement = document.createElement("section");
            categoryElement.className = "category";
            categoryElement.innerHTML = `
              <h2>${category.name}</h2>
              <p>${category.description}</p>
            `;
            categoriesContainer.appendChild(categoryElement);

            categoryElement.setAttribute(
              "data-category-id",
              category.category_id
            );

            categoryElement.addEventListener("click", (event) => {
              this.handleCategoryClick(event);
            });
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }

  async fetchCategories() {
    const response = await fetch(
      window.__ENV__.API_BASE_URL + "api/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    if (response.ok) {
      const categories = await response.json();
      return categories;
    } else {
      console.error("Error fetching categories:", response.statusText);
      return [];
    }
  }

  handleCategoryClick(event: Event) {
    const target = event.target as HTMLElement;
    const categoryElement = target.closest(".category");
    if (categoryElement) {
      const categoryId = categoryElement.getAttribute("data-category-id");
      if (categoryId) {
        window.location.hash = `category/${categoryId}`;
      }
    }
  }
}
