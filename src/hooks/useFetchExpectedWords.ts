import { useState, useMemo } from "react";
import { fetchRandomWord } from "../api";

const useFetchExpectedWord = () => {
  const [expectedWord, setExpectedWord] = useState<string | null>(null);

  const fetchExpectedWord = useMemo(async () => {
    const word = await fetchRandomWord();
    if (word) {
      setExpectedWord(word);
    }
  }, []);

  return { expectedWord, fetchExpectedWord, setExpectedWord };
};

export default useFetchExpectedWord;
