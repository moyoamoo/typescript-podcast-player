import { useSelector } from "react-redux";
import { selectPodcastsSeries } from "../../redux/podcastSlice";
import { IPodcast } from "../../interfaces.ts";
import Podcast from "./Podcast";

import "../CSS/libraryPodcasts.scss";

const PodcastResults = () => {
  const podcastSeries = useSelector(selectPodcastsSeries);

  return podcastSeries.map((podcast: IPodcast) => {
    return <Podcast podcast={podcast} key={podcast.uuid} />;
  });
};

export default PodcastResults;
