
const PodcastPlayerTime = ({ func, time }) => {
 
  return (
    <>
      <span>{func(time)}</span>
    </>
  );
};

export default PodcastPlayerTime;
