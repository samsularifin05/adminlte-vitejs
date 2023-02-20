import { Card, PanelContent, ModalGlobal } from "../../../components";
import FormDataUser from "./form";
import TabelUser from "./tabel";

const DataUsers = () => {
  const handleOnSubmit = async () => {
    const response = await fetch(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
    );
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], "share.jpg", { type: blob.type });
    console.log(navigator.share);
    if (navigator.share) {
      await navigator
        .share({
          title: "title",
          text: "your text",
          url: "https://web.whatsapp.com/",
          files: [file]
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error in sharing", error));
    } else {
      console.log(`system does not support sharing files.`);
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
        <button onClick={() => handleOnSubmit()}> klik </button>
        <TabelUser />
      </Card>

      <ModalGlobal title="Form Tambah Data User">
        <FormDataUser />
      </ModalGlobal>
    </PanelContent>
  );
};

export default DataUsers;
