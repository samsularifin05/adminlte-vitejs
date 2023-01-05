import { default as Axios } from "axios";
import { getItem } from "../helpers";

const server = import.meta.env.VITE_BE;

export function postData(endpoint: string, data?: any) {
  let config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + getItem("userdata").token,
    },
  };
  return new Promise(async (resolve, reject) => {
    console.log(config)
    Axios.post(server + endpoint, data, config)
      .then((res: any) => {
        resolve(res.data.data);
      })
      .catch((err: any) => {
        console.log(err)
        reject(err.response?.data || "Terjadi Kesalahan Saat Mengirim Data");
      });
  });
}
export function getData(endpoint: string, data?: any) {
  let config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + getItem("userdata").token,
    },
  };
  // console.log(getItem("userdata").token)
  return new Promise(async (resolve, reject) => {
    Axios.get(server + endpoint, config)
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err.response?.data || "Terjadi Kesalahan Saat Mengirim Data");
      });
  });
}
export function deleteData(endpoint: string, data?: any) {
  let config = {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + getItem("userdata").token,
    },
  };
  return new Promise(async (resolve, reject) => {
    Axios.delete(server + endpoint, config)
      .then((res: any) => {
        resolve(res.data);
      })
      .catch((err: any) => {
        reject(err.response?.data || "Terjadi Kesalahan Saat Mengirim Data");
      });
  });
}
