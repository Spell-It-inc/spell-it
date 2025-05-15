export async function getAllCategories() {
    const categories = await fetch(`${window.__ENV__.API_BASE_URL}api/categories/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    let categoryArray = await categories.json() as Array<any>;
    return categoryArray;
    
}