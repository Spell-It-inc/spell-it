import { profile } from "node:console";

export async function getWord(category: Number) {
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
        console.error(error)
    }
}

export async function createSession(startedTime: Number, gameScore: Number) {
    try {
            let dateStarted = Date()
            await fetch(window.__ENV__.API_BASE_URL + `api/session-logs/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify({
                profile_id:sessionStorage.getItem('profile_id'),
                game_id:1,
                category_id:sessionStorage.getItem('category'),
                score: gameScore
            })
        })
        window.location.hash = `profile/${sessionStorage.getItem('profile_id')}`;
    } catch (error) {
        console.error(error)
    }
}