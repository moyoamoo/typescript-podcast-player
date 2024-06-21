import defaultImage from "../../assets/podcast-icon.jpg";
import placeHolder from "../../assets/placeholder.jpg"
import { IPodcast } from "../../interfaces";
import { SyntheticEvent } from "react";

const PodcastImage = ({ podcast }: { podcast: IPodcast }) => {
  return (
    <>
      <img
        loading="lazy"
        src={placeHolder}
        alt={podcast.name}
        onError={(e: SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = defaultImage;
          e.currentTarget.onerror = null;
        }}
        onLoad={(e) => {
          e.currentTarget.src = podcast.imageUrl;
        }}
      />
    </>
  );
};

export default PodcastImage;
