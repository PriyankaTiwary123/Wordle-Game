import React from 'react';
import { useButton } from 'react-aria';
import * as styles from "./Button.css";

interface ButtonProps {
  onClick: () => void;
  text: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button className={styles.buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
