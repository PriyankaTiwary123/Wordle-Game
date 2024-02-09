import React, { useEffect } from "react";
import Grid from "../components/Grid/Grid";
import { useWordleContext } from "../context/WordleContext";

interface WordleHomeProps {
  rows: number;
  columns: number;
}

const WordleHome: React.FC<WordleHomeProps> = ({ rows, columns }) => {
  return (
    <main>
      <h1>Welcome to Wordle Game</h1>
      <p>Guess the word by entering letters into the grid below.</p>
      <Grid rows={rows} columns={columns} />
    </main>
  );
};

export default WordleHome;
