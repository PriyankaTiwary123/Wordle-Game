import { useState, useEffect, useMemo } from "react";
import Button from "../../components/Button/Button";
import Modal from "../../components/modal/Modal";
import { REGEX } from "../../constant";
import * as styles from "../../components/Grid/Grid.css";
import { useWordValidation } from "../../hooks/useWordValidation";
import Grid from "../../components/Grid/Grid";

enum ModalType {
  None,
  Win,
  Loss,
}

const WordleHome: React.FC<{ rows: number; columns: number }> = ({
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
      <Grid rows={rows} columns={columns} setAttempts={setAttempts} />
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

export default WordleHome;
