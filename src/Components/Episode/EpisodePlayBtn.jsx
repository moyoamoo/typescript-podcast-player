import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEpisode,
  selectIsLoading,
  setIsClicked,
} from "../../redux/playerSlice";
import { FaPlay } from "react-icons/fa6";
import {
  selectQueue,
  setPlayButton,
  setIsLoading,
} from "../../redux/playerSlice";
import playingGif from "../../assets/playing.gif";

const EpisodePlayBtn = ({ episodePod }) => {
  const queue = useSelector(selectQueue);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);
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
          {playing ? <img src={playingGif} /> : <FaPlay />}
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
