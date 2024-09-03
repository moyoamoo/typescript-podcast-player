import axios from "axios";
import { useDispatch } from "react-redux";
import { setListenData } from "../../redux/statsSlice";
import { url } from "../../config";

export const getListenedData = async (queue, queueIndex) => {
  const dispatch = useDispatch();
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
