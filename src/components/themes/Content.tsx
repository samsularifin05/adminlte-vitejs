import { Route, withRouter } from "react-router-dom";
import { useEffect } from "react";
import MenuRoutes from "../router";
import { PageNotFound } from "../../pages";

interface Props {
  history: any;
}
const Content: React.FC<Props> = (props) => {
  const setTitle = (path: string, routeArray: any) => {
    let pageTitle;
    for (let i = 0; i < routeArray.length; i++) {
      if (routeArray[i].path === path) {
        pageTitle = `Admin Lte | ${routeArray[i].title}`;
      }
    }
    document.title = pageTitle || "Admin Lte | React App";
  };
  useEffect(() => {
    setTitle(props.history.location.pathname, MenuRoutes);
    return () => {
      setTitle(props.history.location.pathname, MenuRoutes);
    };
  });
  return (
    // <Suspense fallback={<Skeleton width="100%" height={1000} />}>
    <div>
      {MenuRoutes.find(
        (list) => list.path === props.history.location.pathname
      ) === undefined ? (
        <Route component={() => <PageNotFound />} />
      ) : (
        MenuRoutes.map((route, index) => (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            component={route?.component}
          />
        ))
      )}
    </div>
    // </Suspense>
  );
};

export default withRouter(Content);
