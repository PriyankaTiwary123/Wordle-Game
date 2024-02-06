import { useState, useEffect, useMemo, useRef } from "react";
import { fetchRandomWord } from "../api";
import * as styles from "../components/wordleGrid/WordleGrid.css";

export const useWordValidation = (rows: number, columns: number) => {
  const [guessedWord, setGuessedWord] = useState("");
  const [expectedWord, setExpectedWord] = useState<string | null>(null);

  useEffect(() => {
    fetchExpectedWord();
  }, []);

  const fetchExpectedWord = async () => {
    const word = await fetchRandomWord();
    if (word) {
      setExpectedWord(word);
    }
  };

  const cellRefs = useRef<
    Array<Array<React.MutableRefObject<HTMLInputElement | null>>>
  >([]);
  for (let i = 0; i < rows; i++) {
    cellRefs.current.push(
      Array.from({ length: columns }, () =>
        useRef<HTMLInputElement | null>(null)
      )
    );
  }

  const validateWord = (colIndex: number, rowIndex: number) => {
    if (!expectedWord) {
      console.error("word not available.");
      return;
    }

    let currentWord = "";

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        currentWord += cellRefs.current[i][j].current?.value || "";
      }
    }

    setGuessedWord(currentWord);
    if (currentWord.toUpperCase() === expectedWord.toUpperCase()) {
      console.log(currentWord, "Entered word is correct!");
    } else {
      console.log(currentWord, "Entered word is Incorrect!");
    }
  };

  const validateGridColor = (colIndex: number, rowIndex: number): string => {
    if (!expectedWord) return styles.wordNotInGrid;
    const position = colIndex + rowIndex * columns;
    const letter = guessedWord[position]?.toUpperCase();
    const correctLetter = expectedWord.includes(letter);
    const correctPosition = expectedWord[position]?.toUpperCase() === letter;
    if (!letter) {
      return "";
    }
    if (letter && correctLetter && correctPosition) {
      return styles.wordMatched;
    } else if (letter && correctLetter) {
      return styles.wordInGrid;
    } else {
      return styles.wordNotInGrid;
    }
  };

  return {
    fetchExpectedWord,
    validateWord,
    validateGridColor,
    guessedWord,
    expectedWord,
    cellRefs,
  };
};
