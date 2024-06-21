import { useEffect } from "react";
import SearchBar from "./SearchBar";
import PodcastResults from "./PodcastResults";
import ShowMoreBtn from "../Episodes/ShowMoreBtn";
import { useDispatch, useSelector } from "react-redux";
import {
  clearApiData,
  selectPodcastsSeries,
  selectSearchTerm,
  setSearchTerm,
} from "../../redux/podcastSlice";
import { getPodcastData } from "../../apiRequests/PodcastData/getPodcastData";
import { IPodcast } from "../../interfaces";



const Search = () => {
  const dispatch = useDispatch();
  const searchTerm: string = useSelector(selectSearchTerm);
  const podcastSeries: IPodcast = useSelector(selectPodcastsSeries);

  useEffect(() => {
    dispatch(clearApiData());
    // dispatch(clearUserLibrary());
    if (searchTerm) {
      getPodcastData(searchTerm, 2, 1, "search");
      dispatch(setSearchTerm(""));
    }
  }, []);

  const callback = (sortBy: number, page: number, type: string): void => {
    getPodcastData(searchTerm, sortBy, page, type);
  };

  return (
    <>
      <main>
        <SearchBar />
        {podcastSeries && (
          <div className="podcastResultsContainer">
            <PodcastResults />
          </div>
        )}
        {Object.entries(podcastSeries).length ? (
          <ShowMoreBtn
            callback={callback}
            totalEpisodesCount={podcastSeries.totalEpisodesCount}
          />
        ) : null}
      </main>
    </>
  );
};

export default Search;
