import { useDispatch } from "react-redux";
import { IPodcast } from "../../interfaces";

interface IFunc {
  type?: string;
  payload?: IPodcast;
}
interface Props {
  func: IFunc;
  text: string;
  className?: string;
}



const QueueBtn = ({ icon, func, text, className }: Props) => {
  const dispatch = useDispatch();
  console.log(typeof func)
  return (
    <>
      <button
        className={className}
        onClick={() => {
          dispatch(func);
        }}
      >
        {text} {icon}
      </button>
    </>
  );
};

export default QueueBtn;
