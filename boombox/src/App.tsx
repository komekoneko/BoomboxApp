import { useState, useRef, useEffect } from "react";
import { track } from "./data/track";
import Content from "./component/Content";
import TrackList from "./component/TrackList";
import Boombox from "./component/Boombox";
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

  return (
    <>
      <div className="bg-layer"></div>
      <div className={`noise ${isPlaying ? "playing" : ""}`}></div>

      {/* ラジカセ部分の表示 */}
      <Boombox
        isPlaying={isPlaying}
        title={track[currentIndex].title}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onPrev={prevTrack}
        onNext={nextTrack}
        onToggle={togglePlay}
        onSeek={timeHandler}
        onVolumeChange={volumeHandler}
      />

      {/* トラックリストの表示 */}
      <TrackList
        tracks={track}
        currentIndex={currentIndex}
        onSelect={selectTrack}
      />
      {/* ポートフォリオ部分の表示 */}
      <Content content={track[currentIndex].content} />
    </>
  );
}

export default App;
