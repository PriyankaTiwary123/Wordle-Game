import { useMemo } from "react";
import * as styles from "./WordleGrid.css";

const WordleGrid: React.FC<{ rows: number; columns: number }> = ({
  rows,
  columns,
}) => {
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    const { key } = event;
    if (/^[a-zA-Z]$/.test(key)) {
      console.log(key, rowIndex, colIndex);
    }
    else {
      event.preventDefault();
    }
  };

  const generateGrid = useMemo(() => {
    const gridItems = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const row = [];
      for (let colIndex = 0; colIndex < columns; colIndex++) {
        row.push(
          <div
            key={colIndex}
            className={styles.cellInput}
            contentEditable={true}
            onKeyPress={(event) => handleKeyPress(event, rowIndex, colIndex)}
          ></div>
        );
      }
      gridItems.push(
        <div key={rowIndex} className="grid-row">
          {row}
        </div>
      );
    }

    return gridItems;
  }, [rows, columns]);

  return <div className={styles.wordleGrid}>{generateGrid}</div>;
};

export default WordleGrid;
