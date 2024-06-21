interface IProps {
  description: string | undefined, 
  showDescription: boolean
}

const EpisodeDescription = ({ description, showDescription} : IProps) => {

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className={showDescription ? "epDescription" : "epDescriptionNone"}
      ></div>
    </>
  );
};

export default EpisodeDescription;
