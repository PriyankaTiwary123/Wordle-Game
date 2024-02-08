import { useState, useEffect, useMemo } from "react";
import { REGEX } from "../../constant";
import { useWordValidation } from "../../hooks/useWordValidation";
import Modal from "../modal/Modal";
import Button from "../Button/Button";
import * as styles from "./WordleGrid.css";

enum ModalType {
  None,
  Win,
  Loss,
}

const WordleGrid: React.FC<{ rows: number; columns: number }> = ({
  rows,
  columns,
}) => {
  const {
    fetchExpectedWord,
    validateWord,
    validateGridColor,
    setGuessedWords,
    setRowIndex,
    guessedWords,
    expectedWord,
    cellRefs,
  } = useWordValidation(rows, columns);
  const [showModal, setShowModal] = useState<ModalType>(ModalType.None);

  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    fetchExpectedWord;
  }, []);

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
    setAttempts((prevAttempts) => prevAttempts + 1);
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

  useEffect(() => {
    const isGuessedWordCorrect = guessedWords.some(
      (word) => word.toUpperCase() === expectedWord
    );
    if (isGuessedWordCorrect) {
      setShowModal(ModalType.Win);
    } else if (attempts === 5) {
      setShowModal(ModalType.Loss);
    }
  }, [guessedWords, expectedWord, attempts]);

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

  const handleModalClose = () => {
    setShowModal(ModalType.None);
    setGuessedWords(Array(rows).fill(""));
    setRowIndex(0);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        const cellRef = cellRefs.current[i][j];
        const currentCell = cellRef.current;
        if (currentCell) {
          currentCell.value = "";
        }
      }
    }
  };
  const handleTryAgainClick = () => {
    handleModalClose();
  };

  return (
    <div>
      {generateGrid}
      <Modal show={showModal !== ModalType.None} onClose={handleModalClose}>
        <div>
          {showModal === ModalType.Win && (
            <>
            <img src={`/images/winIcon.png`} alt="win-icon" />
              <h2>You're a Winner, Champ!</h2>
              <div>
                Congrats! You've just crushed it and won the game. Now, bask in
                your glory and celebrate like a boss! 🎉
              </div>
            </>
          )}
          {showModal === ModalType.Loss && (
            <>
            <img src={`/images/lossIcon.png`} alt="loss-icon" />
              <h2>Oops! Tough Luck, But Don't Give Up!</h2>
              <div>
                You didn't quite make it this time, but hey, no worries! Give it
                another shot, and who knows, the next round might be your moment
                of glory! Keep going, champ! 💪
              </div>
            </>
          )}
        <Button onClick={handleTryAgainClick} text="Try Again" />
        </div>
      </Modal>
    </div>
  );
};

export default WordleGrid;
