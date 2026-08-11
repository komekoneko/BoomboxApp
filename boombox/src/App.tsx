import './App.css'
import { useState } from 'react'

function App() {

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <div className='boombox'>
        <div className='caset'>
          <div className= { `reel ${isPlaying? 'playing': ""}`}></div>
          <div className= { `reel ${isPlaying? 'playing': ""}`}></div>
        </div>
        <div className='music'></div>
        <div className='button'>
          {/* 再生・停止ボタン */}
          <button onClick={() => setIsPlaying(!isPlaying)}>{ isPlaying ? "⏸": "▶" }</button>
        </div>
      </div>
    </>
  )
}

export default App
