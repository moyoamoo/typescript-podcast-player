import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAudioContext } from "../PodcastPlayer/AudioContext";
import {
  getEpisode,
  selectIsLoading,
  selectPaused,
  setIsClicked,
} from "../../redux/playerSlice";
import { FaPlay } from "react-icons/fa6";
import {
  selectQueue,
  setPlayButton,
  setIsLoading,
} from "../../redux/playerSlice";
import "../CSS/audioWave.scss";

const EpisodePlayBtn = ({ episodePod }) => {
  const queue = useSelector(selectQueue);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);
  const paused = useSelector(selectPaused);
  const audioRef = useAudioContext();

  useEffect(() => {
    if (!queue.length) {
      return;
    }
    if (queue) {
      if (queue[0].uuid === episodePod.uuid) {
        setPlaying(true);
      } else {
        setPlaying(false);
      }
      console.log(playing);
    }
  }, [queue, episodePod]);

  return (
    <>
      {!isLoading ? (
        <button
          onClick={() => {
            if (queue.length > 0) {
              if (queue[0].uuid === episodePod.uuid) {
                return;
              }
            }
            dispatch(getEpisode(episodePod));
            dispatch(setIsClicked(true));
            dispatch(setPlayButton(true));
            dispatch(setIsLoading(true));
          }}
        >
          {playing ? (
            <div className="audioWaveContainer">
              <div
                className={!paused ? "line line1" : " line pausedLine line1"}
              ></div>
              <div
                className={!paused ? "line line2" : "line pausedLine line2"}
              ></div>
              <div
                className={!paused ? "line line3" : "line pausedLine line3"}
              ></div>
              <div
                className={!paused ? "line line4" : "line pausedLine line4"}
              ></div>
              <div
                className={!paused ? "line line5" : " line pausedLine line5"}
              ></div>
            </div>
          ) : (
            <FaPlay />
          )}
        </button>
      ) : (
        <button>
          <div className="dots"></div>
        </button>
      )}
    </>
  );
};

export default EpisodePlayBtn;
