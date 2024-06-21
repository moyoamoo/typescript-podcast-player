import defaultImage from "../../assets/podcast-icon.jpg";
import "../CSS/libraryPodcasts.scss";
import { Link } from "react-router-dom";
import { deletefromLibrary } from "../../redux/podcastSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectToken } from "../../redux/librarySlice";
import { url } from "../../config";
import { IPodcast } from "../../interfaces";

const LibraryPodcast = ({ podcast }: { podcast: IPodcast }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  //delete podcast from library
  const deleteFromLibrary = async (uuid : string) => {
    try {
      const { data } = await axios.delete(`${url}/library/delete`, {
        headers: {
          token,
          uuid,
        },
      });
      if (data.status) {
        dispatch(deletefromLibrary(uuid));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="libraryPodcastContainer">
        <Link to={"/episodes/" + podcast.uuid} state={{ podcast }}>
          <img
            loading="lazy"
            src={podcast.imageUrl}
            alt={podcast.name}
            onError={(e) => {
              e.currentTarget.src = defaultImage;
              e.currentTarget.onerror = null;
            }}
          />
        </Link>
        <div className="libraryPodcastHeading">
          <h2>{podcast.name}</h2>

          <button
            className="deleteBtn"
            onClick={() => {
              deleteFromLibrary(podcast.uuid);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default LibraryPodcast;
