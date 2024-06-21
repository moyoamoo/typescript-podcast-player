interface Prop {
  showDescription: boolean;
  toggleDescription: () => void;
}
const ShowDescriptionBtn = ({ showDescription, toggleDescription }: Prop) => {
  return (
    <>
      <button
        className="showBtn"
        onClick={() => {
          toggleDescription();
        }}
      >
        {showDescription ? "Hide Description" : "Show Description"}
      </button>
    </>
  );
};

export default ShowDescriptionBtn;
