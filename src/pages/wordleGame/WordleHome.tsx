import React, { useState, useEffect } from "react";
import Grid from "../../components/Grid/Grid";
import WordleModal from "./WordleModal";
import { ModalType } from "../../enums";
import { useWordValidation } from "../../hooks/useWordValidation";
// import useFetchExpectedWord from "../../hooks/useFetchExpectedWords";

const WordleHome: React.FC<{ rows: number; columns: number, expectedWord: string}> = ({
  rows,
  columns,
  expectedWord
}) => {
  const { guessedWords, setGuessedWords, setRowIndex, cellRefs } =
    useWordValidation(rows, columns, expectedWord);
  const [showModal, setShowModal] = useState<ModalType>(ModalType.None);
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    const isGuessedWordCorrect = guessedWords.some(
      (word) => word.toUpperCase() === expectedWord?.toUpperCase()
    );
    if (isGuessedWordCorrect) {
      setShowModal(ModalType.Win);
    } else if (attempts === 5) {
      setShowModal(ModalType.Loss);
    }
  }, [guessedWords, expectedWord, attempts]);

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

  return (
    <>
      <Grid rows={rows} columns={columns} setAttempts={setAttempts} expectedWord={expectedWord} />
      <WordleModal showModal={showModal} onClose={handleModalClose} />
    </>
  );
};

export default WordleHome;
