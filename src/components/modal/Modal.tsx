import React, { ReactNode } from 'react';
import { ModalType } from '../../enums';
import Button from '../Button/Button';
import * as styles from './Modal.css';

interface ModalProps {
  onClose: () => void;
  showModal: any
}

const Modal: React.FC<ModalProps> = ({onClose, showModal }) => {
  if (showModal==ModalType.None) {
    return null; // Render nothing if modal is not shown
  }
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
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
    </div>
  );
};

export default Modal;
