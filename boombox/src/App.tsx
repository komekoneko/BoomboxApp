import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(new Audio("/2_23_AM.mp3"));

  type Track = {
     id: number, title: string, src: string, content: string 
  }
  

  const track: Track[] = [
    { id: 1, title: "2_23_AM", src: "/2_23_AM.mp3", content: "温泉TodoApp" },
  ];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <>
      <div className="boombox">
        <div className="caset">
          <div className={`reel ${isPlaying ? "playing" : ""}`}></div>
          <div className={`reel ${isPlaying ? "playing" : ""}`}></div>
        </div>

        <div className="music">
          <p>{track[currentIndex].title}</p>
        </div>

        <div className="button">
          {/* 再生・停止ボタン */}
          <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
        </div>
      </div>
    </>
  );
}

export default App;
