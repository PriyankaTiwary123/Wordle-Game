import { useState, useMemo, useRef } from "react";
import * as styles from "./WordleGrid.css";

const WordleGrid: React.FC<{ rows: number; columns: number }> = ({
  rows,
  columns,
}) => {
  const [guessedWord, setGuessedWord] = useState("");

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
        // Handle backspace functionality
        event.preventDefault();
        currentCell.value = "";

        if (colIndex > 0) {
          const prevCol = colIndex - 1;
          cellRefs.current[rowIndex][prevCol]?.current?.focus();
        } else if (rowIndex > 0) {
          const prevRow = rowIndex - 1;
          const lastCol = columns - 1;
          cellRefs.current[prevRow][lastCol]?.current?.focus();
        }
      } else if (/^[a-zA-Z]$/.test(key)) {
        if (colIndex < columns - 1) {
          const nextCol = colIndex + 1;
          cellRefs.current[rowIndex][nextCol]?.current?.focus();
        } else if (rowIndex < rows - 1) {
          const nextRow = rowIndex + 1;
          cellRefs.current[nextRow][0]?.current?.focus();
        }
      } else if (key === "Enter") {
        validateWord(colIndex, rowIndex);
      } else {
        event.preventDefault(); // Prevent entering characters other than alphabets
      }
    }
  };

  const validateWord = (colIndex: number, rowIndex: number) => {
    const expectedWord = "APPLE"; // Change this to the expected word
    let currentWord = "";

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        currentWord += cellRefs.current[i][j].current?.value || "";
      }
    }
    if (currentWord.toUpperCase() === expectedWord.toUpperCase()) {
      console.log(guessedWord, "Entered word is correct!");
    } else {
      console.log(guessedWord, "Entered word is Incorrect!");
    }
  };

  const generateGrid = useMemo(() => {
    const wordleGrids = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const row = [];
      for (let colIndex = 0; colIndex < columns; colIndex++) {
        const cellRef = cellRefs.current[rowIndex][colIndex];
        row.push(
          <input
            key={colIndex}
            className={styles.cellInput}
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
  }, [rows, columns]);

  return <div>{generateGrid}</div>;
};

export default WordleGrid;
