import * as styles from './App.css'
import WordelHome from './pages/wordleGame/WordleHome'

function App() {
  return (
     <div className={styles.rootStyles}>
       <WordelHome rows={5} columns={5}/>
     </div>
  )
}

export default App
