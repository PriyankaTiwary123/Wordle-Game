import * as styles from './App.css'
import WordleGrid from './components/Grid/WordleGrid'

function App() {
  return (
     <div className={styles.rootStyles}>
       <WordleGrid rows={5} columns={5}/>
     </div>
  )
}

export default App
