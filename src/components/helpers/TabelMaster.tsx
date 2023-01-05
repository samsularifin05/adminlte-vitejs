import React, { useEffect, useState } from "react";
import { SearchTableInput, Table } from "ant-table-extensions";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoading, modalShow } from "../../recoil";
import Row from "./Row";
import Col from "./Col";
import Button from "./Button";

interface PropsData {
  dataSource: any;
  columns: any;
  rowKey: string;
  totalPage?: number;
  createData?: boolean;
  onChange?: any;
}
const TabelMaster: React.FC<PropsData> = (props) => {
  const { dataSource, columns, rowKey, totalPage } = props;

  const loading: any = useRecoilValue(isLoading)?.tabel;
  const [searchDataSource, setSearchDataSource] = useState(dataSource);
  const setModal = useSetRecoilState(modalShow);
  useEffect(() => {
    setSearchDataSource(props.dataSource);
  }, [dataSource]);

  const tableProps = {
    loading,
  };

  return (
    <Row>
      <Col size="4">
        <SearchTableInput
          columns={columns}
          dataSource={dataSource}
          setDataSource={setSearchDataSource}
          inputProps={{
            placeholder: "Search Data...",
          }}
        />
      </Col>
      {props.createData && (
        <Col size="8" className="text-right btn-block">
          <Button
            type="button"
            title="Tambah Data"
            onClick={() =>
              setModal({
                isModalShow: true,
                isEdit: false,
                data: [],
              })
            }
            color="primary"
          />
        </Col>
      )}
      <Col size="12" className="mt-3">
        <Table
          {...tableProps}
          pagination={{
            total: totalPage || 0, // total count returned from backend
          }}
          columns={columns}
          dataSource={searchDataSource || []}
          rowKey={rowKey}
          onChange={props.onChange}
        />
      </Col>
    </Row>
  );
};

export default TabelMaster;
