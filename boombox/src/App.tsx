import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(new Audio("/2_23_AM.mp3"));

  type Track = {
    id: number;
    title: string;
    src: string;
    content: string;
  };

  const track: Track[] = [
    { id: 1, title: "2_23_AM", src: "/2_23_AM.mp3", content: "温泉TodoApp" },
    {
      id: 2,
      title: "週末京都現実逃避",
      src: "週末京都現実逃避.mp3",
      content: "Githubユーザー検索App",
    },
    {
      id: 3,
      title: "全てが終わる夜に",
      src: "全てが終わる夜に.mp3",
      content: "BudgetApp",
    },
  ]

  // 前の曲に戻る
  const prevTrack = () => {
    audioRef.current.pause();
    const prevIndex = currentIndex === 0 ? 0 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    audioRef.current.src = track[prevIndex].src;
    if (isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }
// 次の曲に映る
  const nextTrack = () => {
    audioRef.current.pause();
    const nextIndex = currentIndex === track.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    audioRef.current.src = track[nextIndex].src;
    if (isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

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
          <button onClick={prevTrack}>◀◀</button>
          <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
          <button onClick={nextTrack}>▶▶</button>
        </div>
      </div>
    </>
  );
}

export default App;
