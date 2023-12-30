import { baseUrl } from "@/services/endpoints";
import axios from "axios";

export const fetcher = (url: string) => {
  axios
    .get(baseUrl + url, {
      headers: {
        Authorization: `Bearer ${document.cookie}`,
      },
    })
    .then((res: any) => {
      return res.data.data;
    });
};
