import React, { useEffect, useMemo, useState } from "react";
import { REGEX } from "../../constant";
import { useWordValidation } from "../../hooks/useWordValidation";
import * as styles from "./Grid.css";

interface GridProps {
  rows: number;
  columns: number;
  expectedWord: string;
}

const Grid: React.FC<GridProps> = ({ rows, columns, expectedWord }) => {
  const { isCorrectWord, attempts } = useWordValidation(
    rows,
    columns,
    expectedWord
  );

  const { validateGridColor, guessedWords, handleKeyPress, cellRefs } =
    useWordValidation(rows, columns, expectedWord);
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
