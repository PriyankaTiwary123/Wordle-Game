import { WordleProvider } from './context/WordleProvider';
import WordleHome from './pages/WordleHome';
import * as styles from './App.css'
import { COLUMNS, ROWS } from './constant';

function App() {
  
  return (
     <div className={styles.rootStyles}>
       <WordleProvider columns ={COLUMNS}>
       <WordleHome rows={ROWS} columns={COLUMNS}/>
       </WordleProvider>
      
     </div>
  )
}

export default App
