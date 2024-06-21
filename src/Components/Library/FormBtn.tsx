type Button = "submit" | "button";

interface Props {
  className: string;
  text: string;
  func?(): void;
  type: Button;
}

const FormBtn = ({ type, className, text, func }: Props) => {
  return (
    <>
      <div className={className}>
        <button
          type={type}
          onClick={() => {
            func && func();
          }}
        >
          {text}
        </button>
      </div>
    </>
  );
};

export default FormBtn;
