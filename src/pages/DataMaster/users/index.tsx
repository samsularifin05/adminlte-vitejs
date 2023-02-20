import { Card, PanelContent, ModalGlobal } from "../../../components";
import FormDataUser from "./form";
import TabelUser from "./tabel";

const DataUsers = () => {
  const handleShareButton = () => {
    // Check if navigator.share is supported by the browser
    if (navigator.share) {
      console.log("Congrats! Your browser supports Web Share API");
      navigator
        .share({
          url: `https://share.toogoodtogo.com/store/1006/milestones/meals-saved/`
        })
        .then(() => {
          // console.log("Sharing successfull");
          alert("Sharing successfull");
        })
        .catch(() => {
          // console.log("Sharing failed");
          alert("Sharing failed");
        });
    } else {
      alert("Sorry! Your browser does not support Web Share API");

      console.log("Sorry! Your browser does not support Web Share API");
    }
  };
  return (
    <PanelContent
      title="Dashboard"
      menu="Data Master"
      submenu="DemoTabel"
      headerContent
    >
      <Card title="Data Users">
        <button onClick={() => handleShareButton()}> kli2k </button>
        <TabelUser />
      </Card>

      <ModalGlobal title="Form Tambah Data User">
        <FormDataUser />
      </ModalGlobal>
    </PanelContent>
  );
};

export default DataUsers;
