import { NavLink } from "react-router-dom";

interface Props {
  toggleMenu: () => void;
  to: string;
  text: string;
  openMenu: boolean;
  logout: () => void;
  setOpenMenu: (item: boolean) => void;
}

const HeaderLink = ({ to, text, setOpenMenu, openMenu, logout }: Props) => {
  return (
    <>
      <li>
        <NavLink
          to={to}
          onClick={() => {
            setOpenMenu(!openMenu);
            logout && logout();
          }}
        >
          {text}
        </NavLink>
      </li>
    </>
  );
};

export default HeaderLink;
