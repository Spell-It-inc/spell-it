export async function getWord(category:Number) {
    try {
        const words = await fetch(`${window.__ENV__.API_BASE_URL}api/words/category/${category}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!words.ok) {
            throw new Error("Failed to retrieve words");
        }
        const data = await words.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        const word = data[randomIndex].word.toUpperCase();
        sessionStorage.setItem('word', word);
        return word;
    } catch (error) {
        
    }
}