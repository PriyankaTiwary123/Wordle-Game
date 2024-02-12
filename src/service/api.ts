import { WORDLE_API_URL } from "../constant";

export const fetchRandomWord = async (columns: number): Promise<string | null> => {
  try {
    const response = await fetch(
        `${WORDLE_API_URL}?length=${columns}`
    );
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data[0].toUpperCase();
      }
    }
    throw new Error("Failed to fetch word");
  } catch (error) {
    console.error("Error fetching word:", error);
    return null;
  }
};
