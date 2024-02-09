import { useEffect, useState } from 'react';
import { fetchRandomWord } from './api';
import { WordleProvider } from './context/WordleProvider';
import * as styles from './App.css'
import WordleHome from './pages/WordleHome';

function App() {
  
  return (
     <div className={styles.rootStyles}>
       <WordleProvider>
       <WordleHome rows={5} columns={5}/>
       </WordleProvider>
      
     </div>
  )
}

export default App
