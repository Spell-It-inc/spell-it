import type { Component } from "../utils/types"
import { getAllCategories } from "../utils/categories.js"

export class CategoriesComponent implements Component {
    async render(container: HTMLElement): Promise<void> {
        const h1 = document.createElement('h1');
        h1.textContent = 'Please Select A Category';
        container.appendChild(h1);

        const ul = document.createElement('ul');
        ul.className = 'categories';
        
        const categories = await getAllCategories();
        categories.forEach(category => {
            const li = document.createElement('li');
            li.className = 'category';
            li.dataset.id = category.category_id;
            li.textContent = category.name;
            li.addEventListener('click', () => {
                sessionStorage.setItem('category', category.category_id);
                window.location.hash = "#game";
            });
            ul.appendChild(li);
        });
        
        container.appendChild(ul);
    }
}