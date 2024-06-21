import { useSelector } from "react-redux";
import { selectQueue } from "../../redux/playerSlice";
import QueueEpisode from "./QueueEpisode";
import None from "../Library/None";
import { IPodcast } from "../../interfaces";

const Queue = () => {
  const queue: IPodcast[]  = useSelector(selectQueue);
  let counter = 1;
  console.log(queue,"queue");
  return (
    <>
      <main>
        <div className="queueHeading">
          <h2>My Queue</h2>
        </div>
        {queue.length > 0 ? (
          queue.map((episode) => {
            return (
              <QueueEpisode episode={episode} key={episode.uuid + counter++} />
            );
          })
        ) : (
          <None text="No Episodes in Queue" />
        )}
      </main>
    </>
  );
};

export default Queue;
