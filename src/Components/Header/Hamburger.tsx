import { IoMenuOutline, IoClose } from "react-icons/io5";

interface Props {
  toggleMenu: () => void;
  openMenu: boolean;
}

const Hamburger = ({ toggleMenu, openMenu }: Props) => {
  return (
    <>
      <button
        className="hamburger"
        onClick={() => {
          toggleMenu();

        }}
      >
        {openMenu ? <IoClose /> : <IoMenuOutline />}
      </button>
    </>
  );
};

export default Hamburger;
