import { useState, useRef, useEffect } from "react";
import "../CSS/footer.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQueue,
  selectPlayButton,
  setIsLoading,
  setCurrentlyPlaying,
  selectIsClicked,
  setIsClicked,
  setEpisodeReadyState,
} from "../../redux/playerSlice";
import PodcastPlayerDescription from "./PodcastPlayerDescription";
import Controls from "./Controls";
import axios from "axios";
import { setListenData } from "../../redux/statsSlice";
import { selectToken } from "../../redux/librarySlice";
import { url } from "../../config";
import { useAudioContext } from "./AudioContext";
import { addGenres } from "../../apiRequests/Player/addGenres";
import { updateServerDuration } from "../../apiRequests/Player/updateServerDuration";

const PodcastPlayer = () => {
  const audioRef = useAudioContext();
  const queue = useSelector(selectQueue);
  let [queueIndex, setQueueIndex] = useState(0);
  const playButton = useSelector(selectPlayButton);
  const [buffered, setBuffered] = useState(0);
  const [readyState, setReadyState] = useState(false);
  const [podDuration, setPodDuration] = useState("00:00:00");
  const [elapsed, setElapsed] = useState(0);
  const [previousElapsed, setPreviousElpased] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [genreDuration, setGenreDuration] = useState(0);
  const [lastClick, setLastClick] = useState(Date.now());
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isClicked = useSelector(selectIsClicked);

  useEffect(() => {
    if (readyState && playButton && lastClick > 5000 && isClicked) {
      audioRef.current.play();
      setIsPlaying(true);
      setIsClicked(false);
    } else if (readyState) {
      audioRef.current.pause();
      setIsPlaying(false);
      setIsClicked(false);
    }
  }, [playButton, readyState, audioRef, isClicked]);

  useEffect(() => {
    const _elapsed = Math.round(elapsed);
    if (_elapsed === previousElapsed) {
      return;
    }
    updateServerDuration(
      _elapsed,
      audioRef.current.duration,
      queue,
      queueIndex
    );
    setPreviousElpased(_elapsed);
  }, [elapsed]);

  const getListenedData = async () => {
    try {
      const { data } = await axios.get(`${url}/listened/get`, {
        headers: {
          episodeUuid: queue[queueIndex].uuid,
        },
      });
      if (data.data) {
        dispatch(
          setListenData({
            uuid: queue[queueIndex].uuid,
            positionData: data.data,
            duration: audioRef.current.duration,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  const setProgressDuration = () => {
    if (audioRef.current.currentTime) {
      const progress = Math.round(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      );
      setProgress(progress);
    }
  };

  return (
    <>
      {queue.length > 0 ? (
        <div className="podcastPlayer">
          <PodcastPlayerDescription queue={queue} queueIndex={queueIndex} />
          <audio
            src={queue[queueIndex].audioUrl}
            preload="auto"
            autoPlay={true}
            ref={audioRef}
            onProgress={(e) => {
              if (e.currentTarget.duration > 0) {
                for (let i = 0; i < e.currentTarget.buffered.length; i++) {
                  if (
                    e.currentTarget.buffered.start(
                      e.currentTarget.buffered.length - 1 - i
                    ) < e.currentTarget.currentTime
                  ) {
                    setBuffered(
                      (e.currentTarget.buffered.end(
                        e.currentTarget.buffered.length - 1 - i
                      ) *
                        100) /
                        e.currentTarget.duration
                    );
                  }
                  break;
                }
              }
            }}
            onTimeUpdate={(e) => {
              setElapsed(e.currentTarget.currentTime);
              setProgressDuration();

              if (Math.round(e.currentTarget.currentTime) === genreDuration) {
                addGenres(queue, queueIndex);
                return;
              }
            }}
            onCanPlay={(e) => {
              setReadyState(true);
              setIsPlaying(true);
              dispatch(setIsLoading(false));
              setGenreDuration(Math.round(e.currentTarget.duration * 0.1));
            }}
            onDurationChange={(e) => {
              setPodDuration(e.currentTarget.duration);
            }}
            onEnded={() => {
              if (queueIndex < queue.length - 1) {
                queueIndex++;
              } else {
                queueIndex = 0;
              }
            }}
            onPlay={() => {
              getListenedData();
              setIsPlaying(true);
              console.log(isPlaying, audioRef.current.paused);
            }}
          ></audio>
          <Controls
            ref={audioRef}
            queue={queue}
            buffered={buffered}
            queueIndex={queueIndex}
            setQueueIndex={setQueueIndex}
            readyState={readyState}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            podDuration={podDuration}
            progress={progress}
            remainingDuration={elapsed}
            setPodDuration={setPodDuration}
          />
        </div>
      ) : null}
    </>
  );
};

export default PodcastPlayer;
