import { IPodcast } from "../../interfaces";
import PodcastImage from "../Search/PodcastImage";
import PodcastName from "../Search/PodcastName";
import Description from "./Description";
import Genres from "./Genres";
import SortBySelect from "./SortBySelect";

const PodcastDetails = ({ podcast }: { podcast: IPodcast }) => {
  return (
    <>
      <div className="episodesContainer">
        <PodcastName name={podcast.name} />
        <div>
          <PodcastImage podcast={podcast} />
        </div>
        <Description description={podcast.description} />
        <Genres genres={podcast.genres} />

        <div className="sortContainer">
          <SortBySelect uuid={podcast.uuid} />
        </div>
      </div>
    </>
  );
};

export default PodcastDetails;
