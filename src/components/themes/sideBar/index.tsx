import { Link, Route } from "react-router-dom";
// import { useRecoilState } from 'recoil';
// import { toggleSidebarMenu } from '../../../recoil';
import menuApps from "./menu";
import SidebarNavList from "./SidebarNavList";
// import SidebarNavList from './SidebarNavList';

function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/dashboard" className="brand-link text-center">
        <span className="brand-text font-weight-light text-center">ADMIN</span>
      </Link>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            data-accordion="false"
          >
            {menuApps.map((menu, index) => (
              <Route
                path={menu.path}
                key={index}
                children={() => <SidebarNavList data={menu} key={index} />}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
