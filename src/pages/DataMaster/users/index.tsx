import { Card, PanelContent, ModalGlobal } from "../../../components";
import FormDataUser from "./form";
import TabelUser from "./tabel";

const DataUsers = () => {
  return (
    <PanelContent
      title="Dashboard"
      menu="Data Master"
      submenu="DemoTabel"
      headerContent
    >
      <Card title="Data Users">
        <TabelUser />
      </Card>

      <ModalGlobal title="Form Tambah Data User">
        <FormDataUser />
      </ModalGlobal>
    </PanelContent>
  );
};

export default DataUsers;
