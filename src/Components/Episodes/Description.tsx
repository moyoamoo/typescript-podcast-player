const Description = ({ description }: { description: string }) => {
  return (
    <>
      <div
        className="podDescription"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </>
  );
};

export default Description;
