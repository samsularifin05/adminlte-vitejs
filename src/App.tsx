import { Suspense, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  Content,
  Footer,
  getItem,
  Header,
  LoadingContent,
  Sidebar,
  Toast,
  addWindowClass,
  calculateWindowSize,
  LoadingApp,
  removeWindowClass,
  useWindowSize
} from "./components";
import {
  isLoading,
  screenSize,
  themesSetting,
  toggleSidebarMenu
} from "./recoil";
import { Redirect } from "react-router-dom";
import "./assets/css/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const theme = useRecoilValue(themesSetting);
  const loading = useRecoilValue(isLoading);
  const screen = useRecoilValue(screenSize);
  const sidebar = useRecoilValue(toggleSidebarMenu);
  const setSizeValue = useSetRecoilState(screenSize);
  const [valueHideSidebar, setHideSidebar] = useRecoilState(toggleSidebarMenu);

  const handleToggleMenuSidebar = () => {
    setHideSidebar({
      menuSidebarCollapsed: !valueHideSidebar.menuSidebarCollapsed
    });
  };

  const windowSize = useWindowSize();

  useEffect(() => {
    removeWindowClass("sidebar-closed");
    removeWindowClass("sidebar-collapse");
    removeWindowClass("sidebar-open");

    const size = calculateWindowSize(windowSize.width);
    if (screen.screenSize !== size) {
      setSizeValue({ screenSize: size });
    }

    if (sidebar.menuSidebarCollapsed && screen.screenSize === "lg") {
      addWindowClass("sidebar-collapse");
    } else if (sidebar.menuSidebarCollapsed && screen.screenSize === "xs") {
      addWindowClass("sidebar-open");
    } else if (!sidebar.menuSidebarCollapsed && screen.screenSize !== "lg") {
      addWindowClass("sidebar-closed");
      addWindowClass("sidebar-collapse");
    }
  }, [windowSize, sidebar]);

  return (
    <Suspense fallback={<LoadingApp />}>
      <div className="wrapper">
        {getItem("userdata").token ? (
          <>
            {theme.header && <Header />}
            {theme.sidebar && <Sidebar />}
            {theme.content && <Content />}
            {theme.footer && <Footer />}
          </>
        ) : (
          <>
            {localStorage.clear()}
            {theme.content && <Content />}
            <Redirect to="/" />
          </>
        )}
      </div>

      <LoadingContent loading={loading.content || false} />
      <Toast />
      <div
        id="sidebar-overlay"
        role="presentation"
        onClick={handleToggleMenuSidebar}
        onKeyDown={() => {}}
      />
    </Suspense>
  );
}

export default App;
