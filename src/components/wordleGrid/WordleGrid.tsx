import { useMemo, useRef } from "react";
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

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const { key } = event;
    if (/^[a-zA-Z]$/.test(key)) {
      if (colIndex < columns - 1) {
        const nextCol = colIndex + 1;
        cellRefs.current[rowIndex][nextCol]?.current?.focus();
      } else if (rowIndex < rows - 1) {
        const nextRow = rowIndex + 1;
        cellRefs.current[nextRow][0]?.current?.focus();
      }
    } else {
      event.preventDefault(); // to prevent entering any other character other then alphabets
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
            onKeyPress={(event) => handleKeyPress(event, rowIndex, colIndex)}
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
