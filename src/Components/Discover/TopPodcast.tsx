import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectRankedPodcasts } from "../../redux/statsSlice";
import defaultImage from "../../assets/podcast-icon.jpg"
import { IPodcast } from "../../interfaces";

const TopPodcast = ({ podcast } : {podcast : IPodcast}) => {

  const rankedPodcasts = useSelector(selectRankedPodcasts);
  let plays;
  Object.keys(rankedPodcasts).forEach((uuid) => {
    if (uuid === podcast.uuid) {
      plays = rankedPodcasts[uuid];
    }
  });

  return (
    <>
      <div className="listenedContainer">
        <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
          <img
            loading="lazy"
            className="discoverPodcast"
            src={podcast.imageUrl}
            onError={(e) => {
              e.currentTarget.src = defaultImage;
              e.currentTarget.onerror = null;
            }}
          />
          <p className="plays"> Plays {plays}</p>
        </Link>
      </div>
    </>
  );
};

export default TopPodcast;
