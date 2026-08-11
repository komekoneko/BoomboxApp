import './App.css'
import { useState,useRef } from 'react'

function App() {

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio('/2_23_AM.mp3'))

const togglePlay = () => {
  if(isPlaying) {
    audioRef.current.pause();
    setIsPlaying(false);
  }else{
    audioRef.current.play();
    setIsPlaying(true);
  }
}
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
          <button onClick={togglePlay}>{ isPlaying ? "⏸": "▶" }</button>
        </div>
      </div>
    </>
  )
}

export default App
