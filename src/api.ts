export const fetchRandomWord = async (): Promise<string | null> => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?length=5"
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