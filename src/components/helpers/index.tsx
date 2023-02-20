import { lazy } from "react";
import InputField from "./Filed";
import {
  addWindowClass,
  calculateWindowSize,
  getItem,
  LoadingApp,
  LoadingContent,
  removeWindowClass,
  setItem,
  useWindowSize
} from "./function";
import ModalGlobal from "./ModalGlobal";

const Button = lazy(() => import("./Button"));
const Card = lazy(() => import("./Card"));
const Col = lazy(() => import("./Col"));
const Row = lazy(() => import("./Row"));
const HeaderContent = lazy(() => import("./HeaderContent"));
const TabelMaster = lazy(() => import("./TabelMaster"));
const PanelContent = lazy(() => import("./PanelContent"));
import {
  Toast,
  NotifSuccess,
  NotiWarning,
  NotifEror,
  NotifInfo
} from "./Toast";
export {
  addWindowClass,
  calculateWindowSize,
  removeWindowClass,
  useWindowSize,
  LoadingApp,
  ModalGlobal,
  TabelMaster,
  NotifSuccess,
  NotiWarning,
  NotifEror,
  NotifInfo,
  Toast,
  LoadingContent,
  Button,
  getItem,
  setItem,
  InputField,
  Col,
  Row,
  PanelContent,
  HeaderContent,
  Card
};
