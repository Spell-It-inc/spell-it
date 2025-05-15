export async function handleAuth(params: URLSearchParams) {
    try {
        const response = await fetch(window.__ENV__.API_BASE_URL + 'api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: params.get('code') })
        });

        if (!response.ok) {
            throw new Error("Failed to retrieve token");
        }

        const jwt = await response.json();
        sessionStorage.setItem('token', jwt.data.id_token);

        const info = await getTokenInfo();
        return info;
    } catch (error) {
        console.error("Auth error:", error);
        signout();
        return null;
    }
}

export async function getTokenInfo() {
    try {
        const response = await fetch(window.__ENV__.API_BASE_URL + 'api/auth/token-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: sessionStorage.getItem('token') })
        });

        if (!response.ok) {
            throw new Error("Failed to decode token");
        }

        return await response.json();
    } catch (error) {
        console.error("Token info error:", error);
        signout();
        return null;
    }
}

export function signout() {
    // sessionStorage.removeItem('token');
    // window.location.reload()
}
