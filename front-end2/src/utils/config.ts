let API_BASE_URL = "";

export async function loadConfig(): Promise<void> {
  try {
    const res = await fetch("/config.json");
    if (!res.ok) throw new Error("Failed to load config.json");

    const config = await res.json();
    API_BASE_URL = config.API_BASE_URL;
  } catch (error) {
    console.error("Could not load config:", error);
    throw error;
  }
}

export function getApiBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new Error("Config not loaded yet. Call loadConfig() first.");
  }
  return API_BASE_URL;
}
