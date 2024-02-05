import { useMemo } from "react";
import * as styles from "./WordleGrid.css";

const WordleGrid: React.FC<{ rows: number; cols: number }> = ({
  rows,
  cols,
}) => {
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    rowIndex: number,
    colIndex: number
  ) => {
    console.log(event.key, rowIndex, colIndex);
  };

  const generateGrid = useMemo(() => {
    const gridItems = [];

    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const row = [];
      for (let colIndex = 0; colIndex < cols; colIndex++) {
        row.push(
          <div
            key={colIndex}
            className={styles.letterInput}
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
  }, [rows, cols]);

  return <div className={styles.wordleGrid}>{generateGrid}</div>;
};

export default WordleGrid;
