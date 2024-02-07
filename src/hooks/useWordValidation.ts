import { useState, useEffect } from "react";
import useCellRefs from "./useCellRefs";
import useFetchExpectedWord from "./useFetchExpectedWords";
import * as styles from "../components/wordleGrid/WordleGrid.css";

export const useWordValidation = (rows: number, columns: number) => {
  const cellRefs = useCellRefs(rows, columns);
  const { expectedWord, fetchExpectedWord } = useFetchExpectedWord();
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [isCorrectWord, setIsCorrectWord] = useState<boolean>(false);
  const [rowIndex, setRowIndex] = useState(0);

  const validateWord = () => {
    if (!expectedWord || rowIndex >= rows) {
      return;
    }

    let currentWord = "";
    for (let j = 0; j < columns; j++) {
      currentWord += cellRefs.current[rowIndex][j].current?.value || "";
    }
    setGuessedWords((prevGuessedWords) => {
      const updatedGuessedWords = [...prevGuessedWords];
      updatedGuessedWords[rowIndex] = currentWord;
      return updatedGuessedWords;
    });

    setRowIndex(rowIndex + 1);
  };

  useEffect(() => {
    // Reset the correct flag
    let isCorrect = true;
    for (let i = 0; i < guessedWords.length; i++) {
      const guess = guessedWords[i];
      if (!guess) continue; // Skip empty guesses
      const expected = expectedWord || "";
      for (let j = 0; j < guess.length; j++) {
        if (guess[j] !== expected[j]) {
          isCorrect = false;
          break;
        }
      }
      // If the guess is correct, exit the loop
      if (isCorrect) break;
    }
    setIsCorrectWord(isCorrect);
  }, [guessedWords, expectedWord]);

  const validateGridColor = (
    colIndex: number,
    gridRowIndex: number
  ): string => {
    if (!expectedWord) return styles.wordNotInGrid;

    const guessedLetter = guessedWords[gridRowIndex]?.[colIndex]?.toUpperCase();
    const expectedLetter = expectedWord[colIndex]?.toUpperCase();

    if (!guessedLetter) {
      return "";
    }

    if (
      guessedLetter === expectedLetter &&
      expectedWord.indexOf(guessedLetter) === colIndex
    ) {
      return styles.wordMatched;
    } else if (expectedWord.includes(guessedLetter)) {
      return styles.wordInGrid;
    } else {
      return styles.wordNotInGrid;
    }
  };

  return {
    fetchExpectedWord,
    validateWord,
    validateGridColor,
    guessedWords,
    expectedWord,
    cellRefs,
  };
};
