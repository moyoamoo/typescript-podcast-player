import { useCallback } from "react";
import LibraryResults from "./LibraryResults";
import LibrarySortBySelect from "./LibrarySortBySelect";
import axios from "axios";
import { clearApiData, selectPodcastsSeries } from "../../redux/podcastSlice";
import { getPodcastByUuid } from "../../apiRequests/PodcastData/getPodcastByUuid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setWindow,
  setMessage,
  selectSearchTerm,
  setSearchTerm,
  selectToken,
} from "../../redux/librarySlice";
import "../CSS/libraryPodcasts.scss";
import None from "./None";
import { url } from "../../config";
import { IPodcast } from "../../interfaces";

const Library = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  let podcasts = useSelector(selectPodcastsSeries);
  const searchTerm = useSelector(selectSearchTerm);

  console.log(podcasts.length);

  //gets uuids from database
  const getLibraryUuids = useCallback(async () => {
    try {
      const { data } = await axios.get(`${url}/library/get`, {
        headers: {
          token: token,
        },
      });

      if (data.status) {
        data.data.forEach((uuid: string) => {
          getPodcastByUuid(uuid, 2, 1, "library");
        });
      }
    } catch (e) {
      dispatch(setMessage("Podcasts Unavailable"));
      console.log(e);
    }
  }, []);

  //get podcasts using uuids

  useEffect(() => {
    if (!token) {
      dispatch(setWindow(0));
      return;
    }
  }, [window]);

  useEffect(() => {
    dispatch(clearApiData());
    getLibraryUuids();
  }, []);

  let newFiltered;
  if (searchTerm) {
    newFiltered = podcasts.filter((podcast: IPodcast) => {
      if (podcast.name.toLowerCase().includes(searchTerm)) {
        return true;
      }
    });
  }
  return (
    <>
      <main>
        <div className="libraryContainer">
          <div className="libraryHeader">
            <h2>My Library</h2>
            {podcasts.length ? (
              <>
                <input
                  type="text"
                  placeholder="Search Library"
                  onInput={(e) => {
                    dispatch(setSearchTerm(e.currentTarget.value));
                  }}
                />
                <LibrarySortBySelect />
              </>
            ) : null}
          </div>

          {podcasts.length ? (
            <div className="resultsContainer">
              <LibraryResults
                libraryPodcasts={searchTerm ? newFiltered : podcasts}
              />
            </div>
          ) : (
            <None text="No podcasts in Library" />
          )}
        </div>
      </main>
    </>
  );
};

export default Library;
