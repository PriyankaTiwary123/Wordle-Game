import { useState, useEffect } from "react";
import { useWordValidation } from "../../hooks/useWordValidation";
import { useWordleContext } from "../../context/WordleContext";
import Modal from "../modal/Modal";
import { ModalType } from "../../enums";
import * as styles from "./Grid.css";

const Grid: React.FC<{
  rows: number;
  columns: number;
}> = ({ rows, columns }) => {
  const {
    validateWord,
    setGuessedWords,
    setRowIndex,
    handleKeyPress,
    setAttempts,
    isRowValidated,
    resetValidatedRows,
    guessedWords,
    attempts,
    cellRefs,
  } = useWordValidation(rows, columns);
  const { fetchExpectedWord, expectedWord } = useWordleContext();
  const [showModal, setShowModal] = useState<ModalType>(ModalType.None);
  const wordleGrids = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const row = [];
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const cellRef = cellRefs.current[rowIndex][colIndex];
      const cellStyle = validateWord(colIndex, rowIndex);
      row.push(
        <input
          key={colIndex}
          className={`${styles.cellInput} ${cellStyle}`}
          type="text"
          maxLength={1}
          disabled={isRowValidated(rowIndex)} // Disable input if row is validated
          onKeyDown={(event) => handleKeyPress(event, rowIndex, colIndex)}
          ref={cellRef}
          aria-label={`Cell ${rowIndex + 1}, ${colIndex + 1}`}
        />
      );
    }
    wordleGrids.push(
      <div key={rowIndex} className={styles.wordleGridRow}>
        {row}
      </div>
    );
  }

  useEffect(() => {
    const isGuessedWordCorrect = guessedWords.some(
      (word) => word.toUpperCase() === expectedWord
    );
    if (isGuessedWordCorrect) {
      setShowModal(ModalType.Win);
    } else if (attempts === rows) {
      setShowModal(ModalType.Loss);
    }
  }, [guessedWords, expectedWord, attempts]);

  const handleModalClose = () => {
    setShowModal(ModalType.None);
    fetchExpectedWord(columns);
    setGuessedWords(Array(rows).fill(""));
    setRowIndex(0);
    setAttempts(0);
    resetValidatedRows();

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

  return (
    <>
      <div role="grid">{wordleGrids}</div>
      <Modal showModal={showModal} onClose={handleModalClose} />
    </>
  );
};

export default Grid;
