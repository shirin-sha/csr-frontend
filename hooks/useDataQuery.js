import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";

// export const fetcher = async (route, datas = {}, header={}}) => {

export const baseUrl = 'http://localhost:8000' //"https://admin.csrkuwait.com"; //'https://admin.csrkuwait.com' //'http://localhost:8000'

export const fetcher = async ({ key, data = {}, header = {} }) => {
  console.log("fetcher func");

  // const { data } = await axios.post(`${baseUrl}${route}`, datas, header)

  const fdata = await axios.post(`${baseUrl}${key}`, data, header);

  console.log("axios response :", fdata);
  if (fdata.status === 401) {
    const router = useRouter();

    router.push("/login");
  } else {
    return fdata;
  }
};
export default function useDataQuery(dta) {
  console.log("usedataquery function");


  const { data, error, mutate } = useSWR(
    typeof window !== "undefined"
      ? {
          ...dta,
          header: { headers: { token: localStorage.getItem("Token") } },
        }
      : null,
    fetcher,
    { refreshInterval: 200000 }
  );

  console.log({ error });
  if (error && error?.response?.status === 401) {
    console.log("token expired");
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    localStorage.removeItem("UserId");
    const router = useRouter();
    router.push("/login");
  }
  return [data, error, mutate];
}

export const axiosDoc = (file, userUrl) => {
  return new Promise((resolve, reject) => {
    console.log("FILE ", { file });

    axios({
      url: `${baseUrl}/${userUrl}/document-view`,
      data: { file },
      method: "POST",
      responseType: "blob", // Important,
      headers: { token: localStorage.getItem("Token") || "" },
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log({ error });
      });
  });
};
