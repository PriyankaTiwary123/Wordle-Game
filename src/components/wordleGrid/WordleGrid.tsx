import { useState, useEffect, useMemo, useRef } from "react";
import * as styles from "./WordleGrid.css";

const WordleGrid: React.FC<{ rows: number; columns: number }> = ({
  rows,
  columns,
}) => {
  const [guessedWord, setGuessedWord] = useState("");
  const [expectedWord, setExpectedWord] = useState<string | null>(null); // State to store the expected word

  useEffect(() => {
    fetchRandomWord();
  }, []);

  const fetchRandomWord = async () => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?length=5"
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setExpectedWord(data[0].toUpperCase());
        }
      } else {
        throw new Error("Failed to fetch word");
      }
    } catch (error) {
      console.error("Error fetching word:", error);
    }
  };

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
        event.preventDefault(); 
      }
    }
  };

  const validateWord = (colIndex: number, rowIndex: number) => {
    if (!expectedWord) {
      console.error("word not available.");
      return;
    }

    let currentWord = "";

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        currentWord += cellRefs.current[i][j].current?.value || "";
      }
    }

    setGuessedWord(currentWord);
    if (currentWord.toUpperCase() === expectedWord.toUpperCase()) {
      console.log(currentWord, "Entered word is correct!");
    } else {
      console.log(currentWord, "Entered word is Incorrect!");
    }
  };

  const validateGridColor = (colIndex: number, rowIndex: number): string => {
    if (!expectedWord) return styles.wordNotInGrid;
    const position = colIndex + rowIndex * columns;
    const letter = guessedWord[position]?.toUpperCase();
    const correctLetter = expectedWord.includes(letter);
    const correctPosition = expectedWord[position]?.toUpperCase() === letter;
    if (!letter) {
      return ''; 
    }
    if (letter && correctLetter && correctPosition) {
      return styles.wordMatched;
    } else if (letter && correctLetter) {
      return styles.wordInGrid;
    } else {
      return styles.wordNotInGrid;
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
  }, [rows, columns, guessedWord, expectedWord]);

  return <div>{generateGrid}</div>;
};

export default WordleGrid
