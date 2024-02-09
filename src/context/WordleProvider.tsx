import React, { useEffect, useState } from "react";
import { fetchRandomWord } from "../service/api";
import { WordleContext } from "./WordleContext";

export const WordleProvider: React.FC<any> = ({ children }) => {
  const [expectedWord, setExpectedWord] = useState<string>("");

  const fetchExpectedWord = async () => {
    try {
      const word = await fetchRandomWord();
      if (word) {
        setExpectedWord(word);
      }
    } catch (error) {
      console.error("Error fetching expected word:", error);
    }
  };

  useEffect(() => {
    fetchExpectedWord();
  }, []);

  const value = {
    expectedWord,
    fetchExpectedWord,
  };

  return (
    <WordleContext.Provider value={value}>{children}</WordleContext.Provider>
  );
};
