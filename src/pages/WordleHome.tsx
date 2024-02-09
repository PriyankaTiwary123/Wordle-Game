import React from "react";
import Grid from "../components/Grid/Grid";
import * as styles from './WordleHome.css'

interface WordleHomeProps {
  rows: number;
  columns: number;
}

const WordleHome: React.FC<WordleHomeProps> = ({ rows, columns }) => {
  return (
    <main className={styles.mainContainer}>
      <h1>Welcome to Wordle Game</h1>
      <p>Guess the word by entering letters into the grid below.</p>
      <Grid rows={rows} columns={columns} />
    </main>
  );
};

export default WordleHome;
