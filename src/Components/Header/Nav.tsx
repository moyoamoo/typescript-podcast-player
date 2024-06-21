import { useSelector } from "react-redux";
import { selectToken } from "../../redux/librarySlice";
import HeaderLink from "./HeaderLink";
import { logout } from "../../apiRequests/Account/logoutUser";

interface Props {
  openMenu: boolean;
  setOpenMenu: (item: boolean) => void;
}

const Nav = ({ openMenu, setOpenMenu }: Props) => {
  const token = useSelector(selectToken);

  return (
    <>
      <nav>
        <ul className={openMenu ? "showMenu" : "menu"}>
          <HeaderLink
            to="search"
            text="Search"
            setOpenMenu={setOpenMenu}
            openMenu={openMenu}
            toggleMenu={function (): void {
              throw new Error("Function not implemented.");
            }}
            logout={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <HeaderLink
            to="library"
            text="Library"
            setOpenMenu={setOpenMenu}
            openMenu={openMenu}
            toggleMenu={function (): void {
              throw new Error("Function not implemented.");
            }}
            logout={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <HeaderLink
            to="queue"
            text="Queue"
            setOpenMenu={setOpenMenu}
            openMenu={openMenu}
            toggleMenu={function (): void {
              throw new Error("Function not implemented.");
            }}
            logout={function (): void {
              throw new Error("Function not implemented.");
            }}
          />

          <HeaderLink
            to="discover"
            text="Discover"
            setOpenMenu={setOpenMenu}
            openMenu={openMenu}
            toggleMenu={function (): void {
              throw new Error("Function not implemented.");
            }}
            logout={function (): void {
              throw new Error("Function not implemented.");
            }}
          />

          {token ? (
            <HeaderLink
              to="/"
              text="Logout"
              setOpenMenu={setOpenMenu}
              openMenu={openMenu}
              logout={logout}
              toggleMenu={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          ) : (
            <HeaderLink
              to="/"
              text="Login"
              setOpenMenu={setOpenMenu}
              openMenu={openMenu}
              toggleMenu={function (): void {
                throw new Error("Function not implemented.");
              }}
              logout={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
          {token && (
            <HeaderLink
              to="update_account"
              text="Update Account Details"
              setOpenMenu={setOpenMenu}
              openMenu={openMenu}
              toggleMenu={function (): void {
                throw new Error("Function not implemented.");
              }}
              logout={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          )}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
