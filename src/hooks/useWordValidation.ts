import { useState, useEffect, useMemo, useRef } from "react";
import { fetchRandomWord } from "../api";
import * as styles from "../components/wordleGrid/WordleGrid.css";

export const useWordValidation = (rows: number, columns: number) => {
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [expectedWord, setExpectedWord] = useState<string | null>(null);
  const [rowIndex, setRowIndex] = useState(0);

  const fetchExpectedWord = useMemo(async () => {
    const word = await fetchRandomWord();
    if (word) {
      setExpectedWord(word);
    }
  }, []);

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
    guessedWords.forEach((word, index) => {
      if (word && word.toUpperCase() === expectedWord?.toUpperCase()) {
        console.log(word, "Entered word for row", index, "is correct!");
      } else if (word) {
        console.log(word, "Entered word for row", index, "is incorrect!");
      }
    });
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

    if (guessedLetter === expectedLetter) {
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
