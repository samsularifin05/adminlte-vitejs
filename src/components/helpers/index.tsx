import { lazy } from "react";
import Button from "./Button";
import Card from "./Card";
import Col from "./Col";
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
import HeaderContent from "./HeaderContent";
import ModalGlobal from "./ModalGlobal";
import Row from "./Row";
import TabelMaster from "./TabelMaster";
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
