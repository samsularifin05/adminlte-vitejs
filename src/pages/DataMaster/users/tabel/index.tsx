import { DataUserState, dataUserStore } from "../../../../recoil";
import {
  Button,
  Col,
  Row,
  TabelMaster,
} from "../../../../components";
import { useRecoilValue } from "recoil";
const TabelUser = () => {
  const data = dataUserStore()
  const datauser = useRecoilValue(DataUserState)
  const columns = [
    {
      title: "Nama Lengkap",
      dataIndex: "nama_lengkap",
      key: "nama_lengkap",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      hidden: true,
      render: (cell: any, row: any) => {
        return (
          <Row className={`text-center`}>
            <Col size="12" className="mr-3 text-center">
              <Button
                type="button"
                onClick={() => data.deleteDataUser(row.id)}
                color="danger"
                icon="fa-trash"
              />{" "}
              &nbsp;
              <Button
                onClick={() => data.showDataUser(row)}
              type="button" color="info" icon="fa-edit" />
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <TabelMaster
      columns={columns}
      createData={true}
      rowKey="id"
      dataSource={datauser}
    />
  );
};

export default TabelUser;
