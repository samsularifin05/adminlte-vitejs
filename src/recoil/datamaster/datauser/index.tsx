import {
  atom,
  selector,
  useRecoilState,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { isLoading, modalShow } from "../../../recoil/utility";
import {
  deleteData,
  getData,
  NotifEror,
  NotifSuccess,
  postData,
} from "../../../components";
import { M_DataUser } from "./model";

export const DataUserState = atom({
  key: "DataUser",
  default: selector({
    key: "DataUserLoader",
    get: async () => {
      try {
        let response: any = await getData("users");
        return response.data;
      } catch (error) {
        return [];
      }
    },
  }),
});

export const dataUserStore = () => {
  const [datauser, setDataUser] = useRecoilState(DataUserState);
  const hideModal = useResetRecoilState(modalShow);
  const hideLoading = useResetRecoilState(isLoading);
  const setLoading = useSetRecoilState(isLoading);
  const setModal = useSetRecoilState(modalShow);

  const simpanDataUser = async (newData: M_DataUser) => {
    try {
      setLoading({ content: true });
      const response: any = await postData("users", newData);
      setDataUser([...datauser, response]);
      NotifSuccess("Data Berhasil Disimpan");
      hideModal();
      hideLoading();
    } catch (error: any) {
      console.log(error)
      hideLoading();
      NotifEror(error?.message || "Data Gagal Disimpan");
    }
  };

  const showDataUser = async (newData: M_DataUser) => {
    setModal({
      isModalShow: true,
      isEdit: true,
      data: newData,
    });
  };

  // const updateIndustry = async (updatedIndustry: M_DataUser) => {
  //   const newValue = await apiClient.updateIndustry(updatedIndustry);
  //   const newIndustries = industries.map((industry) => {
  //     if (industry.id !== updatedIndustry.id) {
  //       return industry;
  //     }

  //     return updatedIndustry;
  //   });
  //   setIndustries(newIndustries);
  // };

  const deleteDataUser = async (id: string) => {
    try {
      await deleteData("users/" + id);
      setLoading({ content: true });
      const response = datauser.filter((user: any) => user.id !== id);
      setDataUser(response);
      NotifSuccess("Data Berhasil Dihapus");
      hideLoading();
    } catch (error: any) {
      hideLoading();
      NotifEror(error?.response?.message || "Data Gagal Dihapus");
    }
  };

  return { simpanDataUser, deleteDataUser, showDataUser };
};
