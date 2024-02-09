import React from 'react'
import Grid from '../components/Grid/Grid'

interface WordleHomeProps {
    rows: number
    columns: number
    expectedWord: string
}

const WordleHome:React.FC<WordleHomeProps> = ({rows, columns,expectedWord }) => {
  return (
    <div>
    <Grid rows={rows} columns={columns} expectedWord={expectedWord}/>
    </div>
  )
}

export default WordleHome
