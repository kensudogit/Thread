import React from 'react'
import { useState } from 'react'

import './App.css'
import SpreadSheet from './components/spread_sheet'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h2>スレッド投稿管理</h2>
      <SpreadSheet /> 
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>  
    </div>
  )
}

export default App
