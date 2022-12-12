import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastMobile, { Toaster } from "react-hot-toast";
import { calculateWindowSize } from "./function";

let screen = calculateWindowSize(window.innerWidth);
export const Toast = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Toaster position="top-center"  reverseOrder={false} />
    </>
  );
};

export const NotifSuccess = (text: string) => {
  return screen === "xs" || screen === "md" ? toastMobile.success(text) :  toast.success(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const NotifEror = (text: string) => {
  return screen === "xs" || screen === "md" ? toastMobile.error(text) : toast.error(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const NotifInfo = (text: string) => {
  return screen === "xs" || screen === "md" ? toastMobile(text) :  toast.info(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const NotiWarning = (text: string) => {
  return screen === "xs" || screen === "md" ? toastMobile(text) :  toast.warning(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
