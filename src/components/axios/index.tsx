import { default as Axios } from "axios";
import { getItem } from "../helpers";

const server = import.meta.env.VITE_BE;

export function postData(endpoint: string, data?: any) {
  let config = {
    headers: {
      Bearer: getItem("userdata"),
    },
  };
  return new Promise(async (resolve, reject) => {
    Axios.post(server + endpoint, data, config)
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err.response?.data || "Terjadi Kesalahan Saat Mengirim Data");
      });
  });
}
