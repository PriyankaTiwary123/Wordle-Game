import { useState, useEffect, useMemo } from "react";
import { useWordValidation } from "../../hooks/useWordValidation";
import { useWordleContext } from "../../context/WordleContext";
import Modal from "../modal/Modal";
import * as styles from "./Grid.css";

enum ModalType {
  None,
  Win,
  Loss,
}

const WordleGrid: React.FC<{
  rows: number;
  columns: number;
}> = ({ rows, columns }) => {
  const {
    validateWord,
    validateGridColor,
    setGuessedWords,
    setRowIndex,
    handleKeyPress,
    setAttempts,
    guessedWords,
    attempts,
    cellRefs,
  } = useWordValidation(rows, columns);
  const [showModal, setShowModal] = useState<ModalType>(ModalType.None);
  const { fetchExpectedWord, expectedWord } = useWordleContext()

  useEffect(() => {
    const isGuessedWordCorrect = guessedWords.some(
      (word) => word.toUpperCase() === expectedWord
    );
    if (isGuessedWordCorrect) {
      setShowModal(ModalType.Win);
    } else if (attempts === 5) {
      setShowModal(ModalType.Loss);
    } else {
      setShowModal(ModalType.None);
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
    fetchExpectedWord()
    setGuessedWords(Array(rows).fill(""));
    setRowIndex(0);
    setAttempts(0);

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
    <div>
      {generateGrid}
      <Modal showModal={showModal} onClose={handleModalClose} />
    </div>
  );
};

export default WordleGrid;
