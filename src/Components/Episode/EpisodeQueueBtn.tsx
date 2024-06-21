import { useDispatch } from "react-redux";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { addtoQueue, removeFromQueue } from "../../redux/playerSlice";
import { IPodcast } from "../../interfaces";

interface Prop {
  episodePod: IPodcast;
}

const EpisodeQueueBtn = ({ episodePod } : Prop) => {
  const dispatch = useDispatch();
  const [inQueue, setQueue] = useState(false);
  return (
    <>
      <button
        className="queueBtn"
        onClick={() => {
          if (!inQueue) {
            dispatch(addtoQueue(episodePod));
            setQueue(!inQueue);
          } else {
            dispatch(removeFromQueue(episodePod));
            setQueue(!inQueue);
          }
        }}
      >
        Queue {inQueue ? <TiTick /> : <IoIosAddCircleOutline />}
      </button>
    </>
  );
};

export default EpisodeQueueBtn;
