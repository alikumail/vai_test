import { Dispatch } from 'redux';
import { userApi } from "./userApi";
import { axiosInstance } from "../../Config/axiosInstance";
import { endpoints } from "../../Config/apiConfig";



  
type AxiosInstance = {
  getApi: (url: string) => Promise<any>;
  getApiWithData: (data: any,url: string) => Promise<any>;
  updateApi: (data: any, url: string) => Promise<any>;
  postApi: (data: any, url: string) => Promise<any>;
}

const onSubmit = (email: string, password: string) => async (dispatch: Dispatch) => {
  const response = await userApi.login(email, password);
  return response;
};

const onGetUsers = (data:any) => async (dispatch: Dispatch) => {
  const response = await (axiosInstance as AxiosInstance).getApiWithData(data,`${(endpoints).user.users}`);
  return response;
};

const onGetUser = (data:any) => async (dispatch: Dispatch) => {
  const response = await (axiosInstance as AxiosInstance).getApiWithData(data,`${(endpoints).user.getUser}`);
  return response;
};


const onAddUser = (data: any) => async (dispatch : Dispatch) => {
  var response = await axiosInstance.postApi(
    data,
    `${endpoints.user.addUser}`
  );
  return response;
};


const onRegisterUser = (data: any) => async (dispatch : Dispatch) => {
  var response = await axiosInstance.postApi(
    data,
    `${endpoints.user.registerUser}`
  );
  return response;
};




const onDeleteUser = (data: any) => async (dispatch : Dispatch) => {
  var response = await axiosInstance.deleteApiWithoutToken(
    data,
    `${endpoints.user.users}`
  );
  return response;
};

export const userActions = {
  onSubmit,
  onGetUsers,
  onGetUser,
  onAddUser,
  onDeleteUser,
  onRegisterUser
};
