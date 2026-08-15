import { useState, useRef, useEffect } from "react";
import { track } from "./data/track";
import Content from "./component/Content";
import TrackList from "./component/TrackList";
import "./App.css";


function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);



  const audioRef = useRef<HTMLAudioElement>(new Audio(track[0].src));

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
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    //曲の長さを取得
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    //繰り返しを防ぐために追加
    const removeFn = () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

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
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  //現在の再生時間の測定と反映
  const timeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowTime = Number(e.target.value);
    setCurrentTime(nowTime);
    audioRef.current.currentTime = nowTime;
  };
  //時間表示
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const tm = `${String(minutes)}:${String(seconds).padStart(2, "0")}`;
    return tm;
  };

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

        {/* タイムバー */}
        <div className="seek">
          <span className="time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={currentTime}
            onChange={(e) => timeHandler(e)}
          />
          <span className="time">{formatTime(duration)}</span>
        </div>

        <div className="button">
          {/* 再生・停止ボタン */}
          <button onClick={prevTrack}>◀◀</button>
          <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
          <button onClick={nextTrack}>▶▶</button>
        </div>

        {/* 音量バー */}
        <div className="volume">
          <span className="volume-icon">VOL</span>
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

      
        <TrackList
          tracks={track}
          currentIndex={currentIndex}
          onSelect={selectTrack}
        />
        <Content content={track[currentIndex].content} />
      
    </>
  );
}

export default App;
