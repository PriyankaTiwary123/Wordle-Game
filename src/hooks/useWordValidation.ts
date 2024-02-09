import { useState } from "react";
import useCellRefs from "./useCellRefs";
import * as styles from "../components/Grid/Grid.css";
import { REGEX } from "../constant";
import { useWordleContext } from "../context/WordleContext";
import { countLetterOccurrences } from "../utils/helper";

export const useWordValidation = (rows: number, columns: number) => {
  const cellRefs = useCellRefs(rows, columns);
  const { expectedWord } = useWordleContext();
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [rowIndex, setRowIndex] = useState(0);
  const [validatedRows, setValidatedRows] = useState<boolean[]>(
    Array(rows).fill(false)
  );

  const getGuessedWordVal = () => {
    if (!expectedWord || rowIndex >= rows) {
      return;
    }
    const currentWord = getCurrentWord();
    updateGuessedWords(currentWord);
    setRowIndex(rowIndex + 1);
  };

  const getCurrentWord = () => {
    let currentWord = "";
    for (let j = 0; j < columns; j++) {
      currentWord += cellRefs.current[rowIndex][j].current?.value || "";
    }
    return currentWord;
  };

  const updateGuessedWords = (currentWord: string) => {
    setGuessedWords((prevGuessedWords) => {
      const updatedGuessedWords = [...prevGuessedWords];
      updatedGuessedWords[rowIndex] = currentWord;
      return updatedGuessedWords;
    });
  };

  const handleBackSpace = (
    currentCell: any,
    colIndex: number,
    rowIndex: number
  ) => {
    currentCell.value = "";
    if (colIndex > 0) {
      const prevCol = colIndex - 1;
      cellRefs.current[rowIndex][prevCol]?.current?.focus();
    }
  };

  const handleEnterKey = () => {
    getGuessedWordVal();
    setAttempts((prevAttempts: number) => prevAttempts + 1);
    focusNextRow();
  };

  const focusNextRow = () => {
    if (rowIndex < rows - 1) {
      const nextRow = rowIndex + 1;
      cellRefs.current[nextRow][0]?.current?.focus();
    }
  };

  const handleCursorFocus = (rowIndex: number, colIndex: number) => {
    if (colIndex < columns - 1) {
      const nextCol = colIndex + 1;
      cellRefs.current[rowIndex][nextCol]?.current?.focus();
    }
  };

  const isRowFullyFilled = (rowIndex: number) => {
    return cellRefs.current[rowIndex].every(
      (cellRef: React.RefObject<HTMLInputElement>) =>
        cellRef.current?.value.trim() !== ""
    );
  };

  const handleTabOrRegex = (key: string, currentCell: any, colIndex: number) => {
    if (REGEX.test(key)) {
      currentCell.value = key.toUpperCase();
    }
    handleCursorFocus(rowIndex, colIndex);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const { key } = event;
    const currentCellRef = cellRefs.current[rowIndex][colIndex];
    const currentCell = currentCellRef.current;
    if (currentCell) {
      if (key === "Backspace") {
        event.preventDefault();
        handleBackSpace(currentCell, colIndex, rowIndex);
      } else if (key === "Enter") {
        const isRowFilled = isRowFullyFilled(rowIndex);
        if (isRowFilled) {
          handleEnterKey();
        }
      } else if (key === "Tab" || REGEX.test(key)) {
        event.preventDefault();
        handleTabOrRegex(key, currentCell, colIndex);
      } else {
        event.preventDefault();
      }
    }
  };

  const initializeResponse = () => {
    return [styles.empty, styles.empty, styles.empty, styles.empty, styles.empty];
  };

  const validateWord = (
    colIndex: number,
    gridRowIndex: number
  ): string => {
    if (!expectedWord) return styles.notFound;
    const response = initializeResponse();
    const targetWordArr = expectedWord.split("");
    const guessedWordArr = guessedWords[gridRowIndex]?.split("");
    const letterCount = countLetterOccurrences(targetWordArr);

    response.forEach((cellStyle, i) => {
      const guessedLetter = guessedWordArr && guessedWordArr[i];
      const targetLetter = targetWordArr[i];
      if (targetLetter === guessedLetter) {
        response[i] = styles.matched;
        letterCount[guessedLetter]--;
      }
    });

    response.forEach((cellStyle, i) => {
      const guessedLetter = guessedWordArr && guessedWordArr[i];
      if (cellStyle === styles.matched) return;
      if (letterCount[guessedLetter] && letterCount[guessedLetter] > 0) {
        response[i] = styles.found;
        letterCount[guessedLetter]--;
      }
    });

    if (response.every(cellStyle => cellStyle === styles.empty)) {
      return styles.notFound;
    }

    return response[colIndex];
  };

  return {
    getGuessedWordVal,
    validateWord,
    setGuessedWords,
    setRowIndex,
    handleKeyPress,
    setAttempts,
    setValidatedRows,
    guessedWords,
    validatedRows,
    expectedWord,
    attempts,
    cellRefs,
  };
};

