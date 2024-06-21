import { useState } from "react";
import { useSelector } from "react-redux";
import { selectSortOrder } from "../../redux/podcastSlice";
import { callbackFunc } from "../../types";

interface Props {
  callback: callbackFunc;
  totalEpisodesCount: any;
}

const ShowMoreBtn = ({ callback, totalEpisodesCount }: Props) => {
  const sortBy = useSelector(selectSortOrder);
  const [page, setPage] = useState(1);

  const addPage = () => {
    setPage(page + 1);
  };

  if (totalEpisodesCount <= page * 10) {
    return null;
  }

  return (
    <>
      <button
        className="showMoreEps"
        onClick={() => {
          callback(sortBy, page + 1, "showMore");
          addPage();
        }}
      >
        Show More
      </button>
    </>
  );
};

export default ShowMoreBtn;
