import axios from "axios";
import { toast } from "sonner";
import { mutate } from "swr";

export const postRequest: any = async (url: any, data: any, handleSuccess: any,) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers as needed
      },
      body: JSON.stringify(data),
    });

    if (response.status == 201) {
      handleSuccess(data);
    }

    const responseData = await response.json();
    return responseData;
  };
export const updateRequest: any = async ({id,endpoint,data,handleSuccess} : any) => {
  const res = await axios.put(`${endpoint}/${id}`, data);
  console.log(res)
  if (res.status == 200) {
    handleSuccess(data);
  }

  mutate(endpoint);
  };
export const deleteRequest: any = async ({id,endpoint, handleSuccess} : any) => {
  const res = await axios.delete(`${endpoint}/${id}`);
  console.log(res)
  if (res.status == 200) {
    toast.success("Item deleted successfully");
  }

  mutate(endpoint);
  };