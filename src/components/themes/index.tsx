import { lazy } from "react";

const Content = lazy(() => import("./Content"));
const Footer = lazy(() => import("./Footer"));
const Header = lazy(() => import("./Header"));
const Sidebar = lazy(() => import("./sideBar"));

export { Content, Sidebar, Footer, Header };
