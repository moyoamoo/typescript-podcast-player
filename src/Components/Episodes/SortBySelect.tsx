import { getPodcastByUuid } from "../../apiRequests/PodcastData/getPodcastByUuid";
import { setOrder } from "../../redux/podcastSlice";
import { useDispatch } from "react-redux";

const SortBySelect = (uuid: {uuid: string}) => {
  const dispatch = useDispatch();

  return (
    <>
      <select
        onChange={(e) => {
          getPodcastByUuid(Object.values(uuid)[0], e.target.value, 1, "sorted");
          dispatch(setOrder(e.target.value));
        }}
      >
        <option>---Sort By---</option>
        <option value="1">Sort by Oldest</option>
        <option value="2">Sort by Newest</option>
      </select>
     
    </>
  );
};

export default SortBySelect;
