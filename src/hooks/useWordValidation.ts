import { useState } from "react";
import useCellRefs from "./useCellRefs";
import { REGEX } from "../constant";
import { useWordleContext } from "../context/WordleContext";
import * as styles from "../components/Grid/Grid.css";

export const useWordValidation = (rows: number, columns: number) => {
  const cellRefs = useCellRefs(rows, columns);
  const { expectedWord } = useWordleContext();
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [rowIndex, setRowIndex] = useState(0);
  const [validatedRows, setValidatedRows] = useState<boolean[]>(
    Array(rows).fill(false)
  );

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
    currentCell.value = "";
    if (colIndex > 0) {
      const prevCol = colIndex - 1;
      cellRefs.current[rowIndex][prevCol]?.current?.focus();
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
    const { key } = event;
    const currentCellRef = cellRefs.current[rowIndex][colIndex];
    const currentCell = currentCellRef.current;
    if (currentCell) {
      if (key === "Backspace") {
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
      } else if (key === "Tab" || REGEX.test(key)) {
        event.preventDefault();
        if (REGEX.test(key)) {
          currentCell.value = key.toUpperCase();
        }
        handleCursorFocus(rowIndex, colIndex);
      } else {
        event.preventDefault();
      }
    }
  };

  const validateGridColor = (
    colIndex: number,
    gridRowIndex: number
  ): string => {
    if (!expectedWord) return styles.notFound;
  
    const response = [styles.empty, styles.empty, styles.empty, styles.empty, styles.empty];
    const targetWordArr = expectedWord.split("");
    const guessedWordArr = guessedWords[gridRowIndex]?.split("");
    const letterCount: { [key: string]: number } = {};
  
    targetWordArr.forEach((letter) => {
      letterCount[letter] = (letterCount[letter] || 0) + 1;
    });
  
    for (let i = 0; i < targetWordArr.length; i++) {
      const guessedLetter = guessedWordArr && guessedWordArr[i];
      const targetLetter = targetWordArr[i];
      if (targetLetter === guessedLetter) {
        response[i] = styles.matched; 
        letterCount[guessedLetter]--;
      }
    }
  
    for (let i = 0; i < targetWordArr.length; i++) {
      const guessedLetter = guessedWordArr && guessedWordArr[i];
      if (response[i] === styles.matched) continue;
      if (letterCount[guessedLetter] && letterCount[guessedLetter] > 0) {
        response[i] = styles.found;
        letterCount[guessedLetter]--;
      }
    }

    if (response.every(cellStyle => cellStyle === styles.empty)) {
      return styles.notFound;
    }
  
    return response[colIndex];
  };
  
  

  return {
    validateWord,
    validateGridColor,
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
