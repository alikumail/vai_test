import { endpoints } from "../../Config/apiConfig";
import axios from "axios";

function login(email:string, password:string) {
  var data = JSON.stringify({
    email: email,
    password: password,
  });
  var config = {
    method: "post",
    url: endpoints.user.login,
    headers: {
      Authentication: "",
      "Content-Type": "application/json",
    },
    data: data,
  };
  var response = axios(config)
    .then(function (response) {
      localStorage.setItem("access_token", response?.data?.access);
      localStorage.setItem("refresh_token", response?.data?.refresh);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
  return response;
}

export const userApi = {
  login: login,
};

