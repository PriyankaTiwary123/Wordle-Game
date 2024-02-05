import './App.css'
import WordleGrid from './components/wordleGrid/WordleGrid'
import * as styles from './App.css'

function App() {
  return (
     <div className={styles.rootStyles}>
       <WordleGrid rows={5} columns={5}/>
     </div>
  )
}

export default App
