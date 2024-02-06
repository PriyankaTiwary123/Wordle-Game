import { useMemo, useEffect, useRef } from "react";
import * as styles from "./WordleGrid.css";

const WordleGrid: React.FC<{ rows: number; columns: number }> = ({
  rows,
  columns,
}) => {
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

  useEffect(() => {
    console.log("Component mounted, focusing first cell");
    cellRefs.current[0][0]?.current?.focus();
  }, []);

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const { key, target } = event;
    const currentCellRef = cellRefs.current[rowIndex][colIndex];
    if (target === currentCellRef.current) {
      if (/^[a-zA-Z]$/.test(key)) {
        if (colIndex < columns - 1) {
          const nextCol = colIndex + 1;
          cellRefs.current[rowIndex][nextCol]?.current?.focus();
        } else if (rowIndex < rows - 1) {
          const nextRow = rowIndex + 1;
          cellRefs.current[nextRow][0]?.current?.focus();
        }
      } else {
        event.preventDefault(); // Prevent entering characters other than alphabets
      }
    }
  };

  const generateGrid = useMemo(() => {
    const gridItems = [];

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
      gridItems.push(
        <div key={rowIndex} className={styles.wordleGridRow}>
          {row}
        </div>
      );
    }
    return gridItems;
  }, [rows, columns]);

  return <div>{generateGrid}</div>;
};

export default WordleGrid;
