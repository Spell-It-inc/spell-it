import type { Component } from "../utils/types"
import { getAllCategories } from "../utils/categories.js"

export class CategoriesComponent implements Component {
    async render(container: HTMLElement): Promise<void> {
        container.innerHTML = `
        <h1>Please Select A Category</h1>
        <ol class = "category-container">
        ${await generateCategories()}
        </ol>`

        const categories = document.querySelectorAll('.category')
        categories.forEach((element: HTMLElement) => {
            element.addEventListener('click', (e) => {
                sessionStorage.setItem('category', (element).dataset.id)
                window.location.hash = "#game";
            })
        });
    }
}

async function generateCategories() {
    const categories = await getAllCategories()
    let generatedOutcome = ``
    categories.forEach(category => {
        generatedOutcome += `<li class="category" data-id = "${category.category_id}">${category.name}</li>`
    })
    return generatedOutcome
}