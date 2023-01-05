import { atom, selector } from "recoil";
import { calculateWindowSize } from "../../components/helpers/function";

interface LoadingModel {
  content?: boolean;
  button?: boolean;
  tabel?: boolean;
}
interface ModelModal {
  isModalShow?: boolean;
  isEdit?: boolean;
  data?: any;
}

const isLoading = atom({
  key: "loading",
  default: {
    button: false,
    content: false,
    tabel: false,
  } as LoadingModel,
});

const modalShow = atom({
  key: "modalShow",
  default: {
    isModalShow: false,
    isEdit: false,
    data: [],
  } as ModelModal,
});


const screenSize = atom({
  key: "getSizi",
  default: {
    screenSize: calculateWindowSize(window.innerWidth),
  },
});

const toggleSidebarMenu = atom({
  key: "togleMenuSidebar",
  default: {
    menuSidebarCollapsed: false,
  },
});



export { isLoading,modalShow,screenSize, toggleSidebarMenu };
