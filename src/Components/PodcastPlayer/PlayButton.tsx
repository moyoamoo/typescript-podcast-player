import { forwardRef } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { setPaused } from "../../redux/playerSlice";
import { useDispatch, useSelector } from "react-redux";

const PlayButton = forwardRef(function PlayButton(
  { isPlaying, setIsPlaying, readyState },
  audioRef
) {
  const dispatch = useDispatch();
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      dispatch(setPaused(true));
    } else {
      audioRef.current.play();
      dispatch(setPaused(false));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <button className="playBtn">
        {readyState ? (
          <div
            onClick={() => {
              togglePlay();
            }}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </div>
        ) : (
          <div className="pulsing"></div>
        )}
      </button>
    </>
  );
});

export default PlayButton;
