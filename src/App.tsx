import { useEffect, useState } from 'react';
import { fetchRandomWord } from './api';
import * as styles from './App.css'
import WordleHome from './pages/WordleHome';

function App() {
 const [expectedWord, setExpectedWord] = useState<string>(null ||'');

  useEffect(() => {
    const fetchData = async () => {
      const word = await fetchRandomWord();
      if (word) {
        setExpectedWord(word);
      }
    };

    fetchData();
  }, []);
  
  return (
     <div className={styles.rootStyles}>
       <WordleHome rows={5} columns={5} expectedWord={expectedWord}/>
     </div>
  )
}

export default App
