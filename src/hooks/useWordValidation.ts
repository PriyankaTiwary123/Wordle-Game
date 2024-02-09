import { useState, useEffect } from "react";
import useCellRefs from "./useCellRefs";
import * as styles from "../components/Grid/Grid.css";
import { REGEX } from "../constant";
import { useWordleContext } from "../context/WordleContext";

export const useWordValidation = (
  rows: number,
  columns: number,
) => {
  const cellRefs = useCellRefs(rows, columns);
  const { expectedWord } = useWordleContext()
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
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

  const handleBackSpace = (
    currentCell: any,
    colIndex: number,
    rowIndex: number
  ) => {
    const value = currentCell.value;
    if (value === "") return;
    const updatedValue = value.slice(0, -1); // Remove the last character
    currentCell.value = updatedValue;

    if (updatedValue === "") {
      if (colIndex > 0) {
        const prevCol = colIndex - 1;
        cellRefs.current[rowIndex][prevCol]?.current?.focus();
      } else if (rowIndex > 0) {
        const prevRow = rowIndex - 1;
        const lastCol = columns - 1;
        cellRefs.current[prevRow][lastCol]?.current?.focus();
      }
    }
  };

  const handleEnterKey = (rowIndex: number) => {
    validateWord();
    setAttempts((prevAttempts: number) => prevAttempts + 1);
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

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const { key} = event;
    const currentCellRef = cellRefs.current[rowIndex][colIndex];
    const currentCell = currentCellRef.current;

    if (currentCell) {
      if (/^[A-Za-z]$/.test(key)) {
        handleCursorFocus(rowIndex, colIndex);
      } else if (key === "Backspace") {
        event.preventDefault();
        handleBackSpace(currentCell, colIndex, rowIndex);
      } else if (key === "Enter") {
        const isRowFilled = cellRefs.current[rowIndex].every(
          (cellRef: React.RefObject<HTMLInputElement>) =>
            cellRef.current?.value.trim() !== ""
        );
        if (isRowFilled) {
          handleEnterKey(rowIndex);
        }
      } else {
        event.preventDefault();
      }
    }
  };

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
    validateWord,
    validateGridColor,
    setGuessedWords,
    setRowIndex,
    handleKeyPress,
    setAttempts,
    guessedWords,
    expectedWord,
    attempts,
    cellRefs,
  };
};
