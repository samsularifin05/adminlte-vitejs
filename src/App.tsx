import { Suspense, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  Content,
  Footer,
  getItem,
  Header,
  LoadingContent,
  Sidebar,
  Toast,
} from "./components";
import {
  isLoading,
  screenSize,
  themesSetting,
  toggleSidebarMenu,
} from "./recoil";
import { Redirect } from "react-router-dom";
import "./assets/css/index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  addWindowClass,
  calculateWindowSize,
  removeWindowClass,
  useWindowSize,
} from "./components/helpers/function";

function App() {
  const theme = useRecoilValue(themesSetting);
  const loading = useRecoilValue(isLoading);
  const screen = useRecoilValue(screenSize);
  const sidebar = useRecoilValue(toggleSidebarMenu);
  const setSizeValue = useSetRecoilState(screenSize);
  const [valueHideSidebar, setHideSidebar] = useRecoilState(toggleSidebarMenu);

  const handleToggleMenuSidebar = () => {
    setHideSidebar({
      menuSidebarCollapsed: !valueHideSidebar.menuSidebarCollapsed,
    });
  };

  // console.log(sidebar)
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
    <Suspense fallback={<Skeleton width="100%" height={1000} />}>
      {getItem("userdata").token ? (
        <>
          {theme.header && <Header />}
          {theme.sidebar && <Sidebar />}
          {theme.content && <Content />}
          {theme.footer && <Footer />}
        </>
      ) : (
        <>
          {theme.content && <Content />}
          {localStorage.clear()}
          <Redirect to="/" />
        </>
      )}
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
