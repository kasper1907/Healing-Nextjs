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