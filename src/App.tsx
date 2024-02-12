import { WordleProvider } from './context/WordleProvider';
import WordleHome from './pages/WordleHome';
import * as styles from './App.css'

function App() {
  
  return (
     <div className={styles.rootStyles}>
       <WordleProvider columns ={6}>
       <WordleHome rows={3} columns={6}/>
       </WordleProvider>
      
     </div>
  )
}

export default App
