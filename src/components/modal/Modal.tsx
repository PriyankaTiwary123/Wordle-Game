import React, { ReactNode } from 'react';
import * as styles from './Modal.css';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null; // Render nothing if modal is not shown
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
