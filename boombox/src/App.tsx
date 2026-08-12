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
    content: {
      projectName: string;
      description: string;
      url: string;
    };
  };

  const track: Track[] = [
    {
      id: 1,
      title: "2_23_AM",
      src: "/2_23_AM.mp3",
      content: {
        projectName: "温泉TodoApp",
        description: "TodoAppの温泉・銭湯に特化したバージョンです",
        url: "https://onsen-sento-app.vercel.app/",
      },
    },
    {
      id: 2,
      title: "週末京都現実逃避",
      src: "週末京都現実逃避.mp3",
      content: {
        projectName: "Githubユーザー検索App",
        description: "Githubユーザーの詳しい情報を知ることができます",
        url: "https://github-user-search-one-red.vercel.app/",
      },
    },
    {
      id: 3,
      title: "全てが終わる夜に",
      src: "全てが終わる夜に.mp3",
      content: {
        projectName: "BudgetApp",
        description:
          "TodoAppに自動計算機能を加え、会計金額が事前にわかるようにしました",
        url: "https://budget-book-vert-six.vercel.app/",
      },
    },
  ];

  // 前の曲に戻る
  const prevTrack = () => {
    audioRef.current.pause();
    const prevIndex = currentIndex === 0 ? track.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    audioRef.current.src = track[prevIndex].src;
    if (isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
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

  // 再生・停止切り替え
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

      <div className="content">
        <p>{track[currentIndex].content.description}</p>
        <p>{track[currentIndex].content.projectName}</p>
        <a href= {track[currentIndex].content.url} target="_blank">デモを見る</a>
        
      </div>
    </>
  );
}

export default App;
