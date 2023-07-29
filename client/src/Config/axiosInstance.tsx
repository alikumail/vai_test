import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

const api_key = "KHDlNNUx.OdouQOebP7AH5qHX15gOcj7SzvVRhVZx";
interface ResponseType {
  status?: number;
  message?: string;
  [key: string]: any;
}

const messageHandler = (response: ResponseType): void => {
  console.log(response);
  
  if (response.status === 500) {
    toast.error("Something went wrong, please try later.");
  }

  if (response === undefined) {
    toast.error("Something went wrong, please try later.");
    return;
  }

  let errorMessages: string[] = [];


  for (const key in response) {
    if (response.hasOwnProperty(key)) {
      const errorList = response[key];
      let formattedErrors: string[] = [];
      if (Array.isArray(errorList)) {
        formattedErrors = errorList.map(
          (errorMessage) =>
            errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
        );
        const errorMessageString = formattedErrors.join("\n");
        errorMessages.push(`${errorMessageString}`);
      } else if (typeof errorList === "string") {
        errorMessages.push(`${errorList}`);
      } else {
        Object.keys(errorList).forEach((key) => {
          console.log(key, errorList[key]);
        });
        return;
      }
    }
  }

  if (errorMessages.length > 0) {

    errorMessages.forEach((errorMessage) => {
      toast.error(errorMessage);
    });
  } else if (response?.message) {
    toast.error(response.message);
  } else {
    toast.error("Something went wrong, please try later.");
  }
};


function getApi(endpoint: string): Promise<any> {
  var config = {
    method: "get",
    url: endpoint,
    headers: {
      Authorization: `JWT ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
      "X-Api-Key": api_key,
    },
  };
  var response = axios(config)
    .then(function (response: AxiosResponse) {
      if (response.status !== 200) {
        messageHandler(response);
      }
      return response.data;
    })
    .catch(function (error: any) {
      console.log(error);
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("An error occurred.");
      }
      return error;
    });
  return response;
}

function getApiWithData(data:any,endpoint: string): Promise<any> {
  var config = {
    method: "get",
    params:data,
    url: endpoint,
    headers: {
      Authorization: `JWT ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
      "X-Api-Key": api_key,
    },
  };
  var response = axios(config)
    .then(function (response: AxiosResponse) {
      if (response.status !== 200) {
        messageHandler(response);
      }
      return response.data;
    })
    .catch(function (error: any) {
      console.log(error);
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error("An error occurred.");
      }
      return error;
    });
  return response;
}


function getApiWithoutToken(endpoint: string): Promise<any> {
  const config = {
    method: "get",
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": api_key,
    },
  };
  const response = axios(config)
    .then((response: AxiosResponse) => {
      if (response.status !== 200) {
        messageHandler(response);
      }
      return response.data;
    })
    .catch((error: any) => {

      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        messageHandler(error);
      }
      console.log(error);
      return error;
    });
  return response;
}


function postApi(data: any, endpoint: string): Promise<any> {
  const config = {
    method: "post",
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const response = axios(config)
    .then((response: AxiosResponse) => {
      if (response.status !== 200) {
        console.log("Request with Token");
        messageHandler(response);
      }
      return response.data;
    })
    .catch((error: any) => {

      if (error?.response?.data) {
        messageHandler(error.response.data);

      }
      console.log(error);
      return error;
    });
  return response;
}

function postApiWithoutToken(data: any, endpoint: string): Promise<any> {
  const config = {
    method: "post",
    url: endpoint,
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": api_key,
    },
    data: data,
  };
  const response = axios(config)
    .then((response: AxiosResponse) => {
      if (response.status !== 200) {
        messageHandler(response);
      }
      return response.data;
    })
    .catch((error: any) => {
      if (error?.response?.data) {
        messageHandler(error.response.data);
      }
      console.log(error);
      return error;
    });
  return response;
}

function postApiWithoutData(endpoint: string): Promise<any> {
  const config = {
    method: "post",
    url: endpoint,
    headers: {
      Authorization: `JWT ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
      "X-Api-Key": api_key,
    },
  };
  const response = axios(config)
    .then((response: AxiosResponse) => {
      if (response.status !== 200) {
        messageHandler(response);
      }
      return response.data;
    })
    .catch((error: any) => {
      if (error?.response?.data) {
        messageHandler(error.response.data);
      }
      console.log(error);
      return error;
    });
  return response;
}


function updateApi(data: any, endpoint: string): Promise<any> {
  const config = {
    method: "put",
    url: endpoint,
    headers: {
      Authorization: `JWT ${localStorage.getItem("access_token")}`,
      "X-Api-Key": api_key,
      "Content-Type": "application/json",
    },
    data: data,
  };
  const response = axios(config)
    .then((response: AxiosResponse) => {
      if (response.status !== 200) {
        messageHandler(response);
      }
      return response.data;
    })
    .catch((error: any) => {
      if (error?.response && error.response.status !== 200) {
        messageHandler(error.response.data);
      }
      console.log(error);
      return error;
    });
  return response;
}


function updateApiWithoutToken(data: any, endpoint: string): Promise<any> {
  const config = {
    method: "put",
    url: endpoint,
    headers: {
      "X-Api-Key": api_key,
      "Content-Type": "application/json",
    },
    data: data,
  };
  const response = axios(config)
    .then((response: AxiosResponse) => {
      if (response.status !== 200) {
        messageHandler(response);
      }
      return response.data;
    })
    .catch((error: any) => {
       if (error?.response?.data?.message) {
        toast.error(
          error.response.data.message
            ? error.response.data.message
            : "Something went wrong, please try later."
        );
      }
      console.log(error);
      return error;
    });
  return response;
}

function deleteApi(data: any, endpoint: string): Promise<any> {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${endpoint}/${data}`,
    headers: {
      Authorization: `JWT ${localStorage.getItem("access_token")}`,
      "X-Api-Key": api_key,
      "Content-Type": "application/json",
    },
    data: data,
  };
  const response = axios(config)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      return error;
    });
  return response;
}


function deleteApiWithoutToken(data: any, endpoint: string): Promise<any> {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${endpoint}/${data}`,
    headers: { },
    data: data,
  };
  const response = axios(config)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      return error;
    });
  return response;
}

function deleteApiWithoutData(endpoint: string): Promise<any> {
  const config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: endpoint,
    headers: {
      Authorization: `JWT ${localStorage.getItem("access_token")}`,
      "X-Api-Key": api_key,
      "Content-Type": "application/json",
    },
  };
  const response = axios(config)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      return error;
    });
  return response;
}


export const axiosInstance = {
  getApi: getApi,
  getApiWithoutToken: getApiWithoutToken,
  getApiWithData: getApiWithData,
  postApi: postApi,
  postApiWithoutData: postApiWithoutData,
  updateApi: updateApi,
  deleteApi: deleteApi,
  deleteApiWithoutData: deleteApiWithoutData,
  postApiWithoutToken: postApiWithoutToken,
  updateApiWithoutToken: updateApiWithoutToken,
  deleteApiWithoutToken: deleteApiWithoutToken,
};
