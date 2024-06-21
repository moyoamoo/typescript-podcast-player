import { IPodcast } from "../../interfaces";
import LibraryPodcast from "./LibraryPodcast";
const LibraryResults = ({
  libraryPodcasts,
}: {
  libraryPodcasts: IPodcast[];
}) => {
  return libraryPodcasts.map((podcast) => {
    return <LibraryPodcast podcast={podcast} key={podcast.uuid} />;
  });
};

export default LibraryResults;
