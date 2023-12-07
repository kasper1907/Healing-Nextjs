import { baseUrl } from "@/services/endpoints";
import axios from "axios";

export const fetcher = (url: string) => {
  //console.log(baseUrl + url);
  axios
    .get(baseUrl + url, {
      headers: {
        Authorization: `Bearer ${document.cookie}`,
      },
    })
    .then((res: any) => {
      //console.log(res.data.data);
      return res.data.data;
    });
};
