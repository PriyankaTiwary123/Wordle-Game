import { WordleProvider } from './context/WordleProvider';
import WordleHome from './pages/WordleHome';
import * as styles from './App.css'

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
