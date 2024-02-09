import React, { createContext, useContext } from 'react';

export interface WordleContextType {
  expectedWord: string;
  fetchExpectedWord: () => void;
}

export const WordleContext = createContext<WordleContextType | undefined>(undefined);

export const useWordleContext = () => {
  const context = useContext(WordleContext);
  if (!context) {
    throw new Error('useWordleContext must be used within a WordleProvider');
  }
  return context;
};
