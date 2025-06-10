import { TablePaginationConfig } from "antd";
import { ChangeEvent } from "react";

export interface TableColumn {
  title?: string;
  dataIndex?: string;
  key: string;
}

export interface SearchInterface {
  skip?: number;
  limit?: number;
  q?: string;
  tgl_system?: string;
  status_valid?: boolean;
  kode_pegawai?: string;
  end_date?: string;
  start_date?: string;
  status_kasbon?: string;
  namaForm?: string;
  kode_toko?: string;
  status_validasi?: string;
}
interface CustomTablePaginationConfig extends TablePaginationConfig {
  q?: string;
  skip?: number;
  limit?: number;
  total?: number;
}
export interface TableMasterProps {
  dataSource: any;
  id?: string;
  columns: any;
  formName?: string;
  title?: string;
  addButtonTitle?: string;
  addButtonTitle2?: string;
  addButtonTitle3?: string;
  namaForm?: string;
  rowKey: string;
  isLoading?: boolean;
  exportCsv?: boolean;
  scrollX?: boolean;
  hiddenButton?: boolean;
  hiddenButton2?: boolean;
  hiddenButton3?: boolean;
  total?: number;
  width?: number;
  loading?: boolean;
  disabledPagenation?: boolean;
  disabledSearch?: boolean;
  rowSelection?: any;
  changePagenation?: (row: CustomTablePaginationConfig) => void;
  onAddButtonClick?: () => void;
  onAddButtonClick2?: () => void;
  onAddButtonClick3?: () => void;
  searchText?: string;
  expandable?: any;
  footer?: any;
  summary?: any;
  disableButton?: boolean;
  disableButton2?: boolean;
  disableButton3?: boolean;
  handleSearch?: (row: ChangeEvent<HTMLInputElement>) => void;
}

export interface InterFaceFormDataUser {
  email: string;
  password: string;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface TabelInterFace<T> {
  data: T[];
  count: number;
}

export interface ColumnInterFace<T> {
  title: string;
  width?: number;
  editable?: boolean;
  dataIndex?: keyof T; // Use keyof to ensure keys match interface
  key: keyof T | React.Key; // Use React.Key for key type
  align?: "left" | "right" | "center" | undefined;
  render?: (text: any, record: T, index: number) => any;
}
