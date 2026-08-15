type BoomboxProps = {
  isPlaying: boolean;
  title: string;
  currentTime: number;
  duration: number;
  volume: number;
  onPrev: () => void;
  onToggle: () => void;
  onNext: () => void;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

//時間表示
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const tm = `${String(minutes)}:${String(seconds).padStart(2, "0")}`;
  return tm;
};

function Boombox({
  isPlaying,
  title,
  currentTime,
  duration,
  volume,
  onPrev,
  onToggle,
  onNext,
  onSeek,
  onVolumeChange,
}: BoomboxProps) {
  return (
    <div className="boombox">
      <div className="caset">
        <div className={`reel ${isPlaying ? "playing" : ""}`}></div>
        <div className={`reel ${isPlaying ? "playing" : ""}`}></div>
      </div>

      <div className="music">
        <p className={isPlaying ? "playing" : ""}>
          {title}
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
          onChange={(e) => onSeek(e)}
        />
        <span className="time">{formatTime(duration)}</span>
      </div>

      <div className="button">
        {/* 再生・停止ボタン */}
        <button onClick={onPrev}>◀◀</button>
        <button onClick={onToggle}>{isPlaying ? "⏸" : "▶"}</button>
        <button onClick={onNext}>▶▶</button>
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
          onChange={(e) => onVolumeChange(e)}
        />
      </div>
    </div>
  );
}

export default Boombox;
