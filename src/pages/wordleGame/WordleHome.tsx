import React, { useState, useEffect } from "react";
import Grid from "../../components/Grid/Grid";
import { ModalType } from "../../enums";
import { useWordValidation } from "../../hooks/useWordValidation";
import WordleModal from "./WordleModal";

const WordleHome: React.FC<{
  rows: number;
  columns: number;
  expectedWord: string;
}> = ({ rows, columns, expectedWord }) => {
  const { isCorrectWord, attempts } = useWordValidation(
    rows,
    columns,
    expectedWord
  );

  const [showModal, setShowModal] = useState<ModalType>(ModalType.None);

  useEffect(() => {
    if (isCorrectWord) {
      setShowModal(ModalType.Win);
    } else if (attempts >= 5) {
      setShowModal(ModalType.Loss);
    }
  }, [isCorrectWord, attempts]);

  return (
    <>
      <Grid rows={rows} columns={columns} expectedWord={expectedWord} />
      <WordleModal
        showModal={showModal}
        onClose={() => setShowModal(ModalType.None)}
      />
    </>
  );
};

export default WordleHome;
