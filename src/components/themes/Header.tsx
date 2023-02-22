import { isLoading, toggleSidebarMenu } from "../../recoil";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { getItem } from "../helpers";

function Header() {
  const setLoading = useSetRecoilState(isLoading);
  const [valueHideSidebar, setHideSidebar] = useRecoilState(toggleSidebarMenu);

  const handleToggleMenuSidebar = () => {
    setHideSidebar({
      menuSidebarCollapsed: !valueHideSidebar.menuSidebarCollapsed
    });
  };
  const logout = () => {
    setLoading({ content: true, button: true });
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 100);
  };
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={handleToggleMenuSidebar}
            data-widget="pushmenu"
            aria-label="Menu Hide Bar"
            role="button"
          >
            <i className="fas fa-bars" />
          </span>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <div className="nav-item dropdown" onMouseEnter={toggleMenu}>
            <Link to="#" className="nav-link dropdown-toggle user-action">
              <img
                src="https://www.tutorialrepublic.com/examples/images/avatar/2.jpg"
                className="avatarProfile"
                alt="Avatar"
              />{" "}
              {getItem("userdata").nama_lengkap} <b className="caret"></b>
            </Link>
            <div
              className={`dropdown-menu ${menu ? "show" : ""}`}
              onMouseLeave={() => setMenu(false)}
            >
              <button type="button" className="dropdown-item">
                <i className="fa fa-user"></i> Profile
              </button>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => logout()}
              >
                <i className="nav-icon fas fa-arrow-right-from-bracket"></i>{" "}
                Logout kau
              </button>
            </div>
          </div>
        </li>
        {/* <li className="nav-item">
          <Link
            className="nav-link"
            data-widget="fullscreen"
            to="#"
            role="button"
          >
            <i className="fas fa-expand-arrows-alt"></i>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
}

export default memo(Header);
