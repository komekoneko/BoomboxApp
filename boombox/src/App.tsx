import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);

  const audioRef = useRef<HTMLAudioElement>(
    new Audio("/blackbox-black-box-chill-2short-form-bgm-486308.mp3"),
  );

  type Track = {
    id: number;
    title: string;
    src: string;
    content: {
      projectName: string;
      description: string;
      url: string;
      linkText: string
    };
  };

  const track: Track[] = [
    {
      id: 0,
      title: "2_23_AM",
      src: "/2_23_AM.mp3",
      content: {
        projectName: "Kai/大学3年",
        description:
          "フロントエンドエンジニア志望、最近はUIUXにも興味を持っています。よく使う言語→ JavaScript, TypeScript 資格→ 基本情報技術者",
        url: "https://github.com/komekoneko",
        linkText: "GitHubを見る"

      },
    },
    {
      id: 1,
      title: "BLACK BOX - Chill 2",
      src: "/blackbox-black-box-chill-2short-form-bgm-486308.mp3",
      content: {
        projectName: "温泉TodoApp",
        description: "TodoAppの温泉・銭湯に特化したバージョンです",
        url: "https://onsen-sento-app.vercel.app/",
        linkText: "デモを見る"
      },
    },
    {
      id: 2,
      title: "364 Imaginary Art Museum",
      src: "/tooone-364-imaginary-art-museum-537413.mp3",
      content: {
        projectName: "Githubユーザー検索App",
        description: "Githubユーザーの詳しい情報を知ることができます",
        url: "https://github-user-search-one-red.vercel.app/",
        linkText: "デモを見る"
      },
    },
    {
      id: 3,
      title: "Lofi — Night Haze",
      src: "/ornave-lofi-night-haze-553402.mp3",
      content: {
        projectName: "BudgetApp",
        description:
          "TodoAppに自動計算機能を加え、会計金額が事前にわかるようにしました",
        url: "https://budget-book-vert-six.vercel.app/",
        linkText: "デモを見る"

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
    }
  };
  // 次の曲に移る
  const nextTrack = () => {
    audioRef.current.pause();
    const nextIndex = currentIndex === track.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
    audioRef.current.src = track[nextIndex].src;
    if (isPlaying) {
      audioRef.current.play();
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

  //自動で次の曲に進む
  useEffect(() => {
    const audio = audioRef.current;
    audioRef.current.volume = volume;

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener("ended", handleEnded);

    const removeFn = () => {
      audio.removeEventListener("ended", handleEnded);
    };

    return removeFn;
  }, [currentIndex, isPlaying]);

  //音量調整バーの設定
  const volumeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  //曲一覧の表示
  const selectTrack = (index: number) => {
    audioRef.current.pause();
    setCurrentIndex(index);
    audioRef.current.src = track[index].src;
    if(isPlaying) {
      audioRef.current.play();
    }
  }

  return (
    <>
      <div className="bg-layer"></div>
      <div className={`noise ${isPlaying ? "playing" : ""}`}></div>
      <div className="boombox">
        <div className="caset">
          <div className={`reel ${isPlaying ? "playing" : ""}`}></div>
          <div className={`reel ${isPlaying ? "playing" : ""}`}></div>
        </div>

        <div className="music">
          <p className={isPlaying ? "playing" : ""}>
            {track[currentIndex].title}
          </p>
        </div>

        <div className="button">
          {/* 再生・停止ボタン */}
          <button onClick={prevTrack}>◀◀</button>
          <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
          <button onClick={nextTrack}>▶▶</button>
        </div>

        {/* 音量バー */}
        <div className="volume">
          <span className="volume-icon">🔈</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => volumeHandler(e)}
          />
        </div>
      </div>

      <div className="tracklist">
          {track.map((i, index) => (
            <button 
            key={i.id}
            className= {index === currentIndex? "active": ""}
            onClick={()=> selectTrack(index)}
            >{i.content.projectName}</button>
          ))}
      </div>

      <div className="content">
        <p>{track[currentIndex].content.projectName}</p>
        <p>{track[currentIndex].content.description}</p>
        <a href={track[currentIndex].content.url} target="_blank">
          {track[currentIndex].content.linkText}
        </a>
      </div>
    </>
  );
}

export default App;
