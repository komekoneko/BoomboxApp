import type{ Track } from "../data/track";
type TrackListProps = {
    tracks: Track[];
    currentIndex: number;
    onSelect: (index: number) => void;
};

function TrackList({ tracks,currentIndex, onSelect }: TrackListProps){
    return(
      <div className="tracklist">
        {tracks.map((i, index) => (
          <button
            key={i.id}
            className={index === currentIndex ? "active" : ""}
            onClick={() => onSelect(index)}
          >
            {i.content.projectName}
          </button>
        ))}
      </div>
    )
}

export default TrackList;