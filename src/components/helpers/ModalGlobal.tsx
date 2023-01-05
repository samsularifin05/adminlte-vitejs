import React from "react";
import { Modal } from "antd";
import { useRecoilState } from "recoil";
import { modalShow } from "../../recoil";

// const ModalGlobal = (props) => {

interface PropsData {
  children?: any;
  title: string;
}
const ModalGlobal: React.FC<PropsData> = (props) => {
  const { children, title } = props;
  const [getModal, setModal] = useRecoilState(modalShow);
  return (
    <Modal
      title={title}
      open={getModal?.isModalShow}
      footer={null}
      onCancel={() =>
        setModal({
          isModalShow: false,
          isEdit: false,
          data: [],
        })
      }
    >
      {children}
    </Modal>
  );
};

export default ModalGlobal;
