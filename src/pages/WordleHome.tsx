import React, { useEffect } from "react";
import Grid from "../components/Grid/Grid";
import { useWordleContext } from "../context/WordleContext";

interface WordleHomeProps {
  rows: number;
  columns: number;
}

const WordleHome: React.FC<WordleHomeProps> = ({ rows, columns }) => {
  return (
    <div>
      <Grid rows={rows} columns={columns} />
    </div>
  );
};

export default WordleHome;
