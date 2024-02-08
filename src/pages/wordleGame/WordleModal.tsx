import React from "react";
import Modal from "../../components/modal/Modal";
import Button from "../../components/Button/Button";
import { ModalType } from "../../enums";

interface WordleModalProps {
  showModal: ModalType;
  onClose: () => void;
}

const WordleModal: React.FC<WordleModalProps> = ({ showModal, onClose }) => {
  return (
    <Modal show={showModal !== ModalType.None} onClose={onClose}>
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
        <Button onClick={onClose} text="Try Again" />
      </div>
    </Modal>
  );
};

export default WordleModal;
