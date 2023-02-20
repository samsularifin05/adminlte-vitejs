import { lazy } from "react";
// import { Dashboard } from './dashboard';
const PageNotFound = lazy(() => import("./404"));
const Login = lazy(() => import("./auth"));
const Dashboard = lazy(() => import("./dashboard"));
import { DataUsers } from "./DataMaster";

export { Dashboard, DataUsers, PageNotFound, Login };
