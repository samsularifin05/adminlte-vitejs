import { atom } from 'recoil';
import { calculateWindowSize } from '../../components/helpers/function';

interface LoadingModel {
  content?: boolean;
  button?: boolean;
}

const isLoading = atom({
  key: 'loading',
  default: {
    button: false,
    content: false,
  } as LoadingModel,
});

const screenSize = atom({
  key : "getSizi",
  default : {
    screenSize: calculateWindowSize(window.innerWidth)
  }
})

const toggleSidebarMenu = atom({
  key : "togleMenuSidebar",
  default : {
    menuSidebarCollapsed : false
  }
})



export { isLoading,screenSize,toggleSidebarMenu };
