import React from 'react';
import { ModalType } from '../../enums';
import Button from '../Button/Button';
import * as styles from './Modal.css';

interface ModalProps {
  onClose: () => void;
  showModal: ModalType;
}

const Modal: React.FC<ModalProps> = ({ onClose, showModal }) => {
  if (showModal === ModalType.None) {
    return null; // Render nothing if modal is not shown
  }

  const modalTitle = showModal === ModalType.Win ? "Congratulations! You Won!" : "Oops! You Lost!";
  const modalDescription = showModal === ModalType.Win ? "You're a Winner, Champ! Congrats! You've just crushed it and won the game. Now, bask in your glory and celebrate like a boss! 🎉" : "Tough Luck, But Don't Give Up! You didn't quite make it this time, but hey, no worries! Give it another shot, and who knows, the next round might be your moment of glory! Keep going, champ! 💪";

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} role="document">
        <img src={showModal === ModalType.Win ? `/images/winIcon.png` : `/images/lossIcon.png`} alt={showModal === ModalType.Win ? "win-icon" : "loss-icon"} />
        <h2 id="modalTitle">{modalTitle}</h2>
        <div id="modalDescription">
          {modalDescription}
        </div>
        <Button onClick={onClose} text="Try Again" />
      </div>
    </div>
  );
};

export default Modal;
