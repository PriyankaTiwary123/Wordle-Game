import React from 'react';
import * as styles from "./Button.css";

interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, className }) => {
  return (
    <button className={styles.buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
