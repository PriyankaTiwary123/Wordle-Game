import React, { useEffect, useMemo, useState } from "react";
import { REGEX } from "../../constant";
import { useWordValidation } from "../../hooks/useWordValidation";
import * as styles from "./Grid.css";

interface GridProps {
  rows: number;
  columns: number;
  setAttempts: Function;
  expectedWord: string;
}

const Grid: React.FC<GridProps> = ({ rows, columns, setAttempts, expectedWord }) => {
  //   const [attempts, setAttempts] = useState<number>(0);

  const {
    validateWord,
    validateGridColor,
    setGuessedWords,
    setRowIndex,
    guessedWords,
    cellRefs,
  } = useWordValidation(rows, columns, expectedWord);

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
    const { key } = event;
    const currentCellRef = cellRefs.current[rowIndex][colIndex];
    const currentCell = currentCellRef.current;

    if (currentCell) {
    }
    if (REGEX.test(key)) {
      handleCursorFocus(rowIndex, colIndex);
    } else if (key === "Backspace") {
      event.preventDefault();
      handleBackSpace(currentCell, colIndex, rowIndex);
    } else if (key === "Enter") {
      handleEnterKey(rowIndex);
    } else {
      event.preventDefault();
    }
  };

  const generateGrid = useMemo(() => {
    const wordleGrids = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const row = [];
      for (let colIndex = 0; colIndex < columns; colIndex++) {
        const cellRef = cellRefs.current[rowIndex][colIndex];
        const cellStyle = validateGridColor(colIndex, rowIndex);
        row.push(
          <input
            key={colIndex}
            className={`${styles.cellInput} ${cellStyle}`}
            type="text"
            maxLength={1}
            onKeyUp={(event) => handleKeyPress(event, rowIndex, colIndex)}
            ref={cellRef}
          />
        );
      }
      wordleGrids.push(
        <div key={rowIndex} className={styles.wordleGridRow}>
          {row}
        </div>
      );
    }
    return wordleGrids;
  }, [rows, columns, guessedWords, expectedWord]);

  return <div>{generateGrid}</div>;
};

export default Grid;
