import { Dispatch } from 'redux';
import { axiosInstance } from "../../Config/axiosInstance";
import { endpoints } from "../../Config/apiConfig";



  
type AxiosInstance = {
  getApi: (url: string) => Promise<any>;
  getApiWithData: (data: any,url: string) => Promise<any>;
  updateApi: (data: any, url: string) => Promise<any>;
  postApi: (data: any, url: string) => Promise<any>;
}

const onDoctors = () => async (dispatch: Dispatch) => {
  const response = await (axiosInstance as AxiosInstance).getApi(`${(endpoints).doctor.doctors}`);
  return response;
};


const onAddDoctor = (data: any) => async (dispatch : Dispatch) => {
  var response = await axiosInstance.postApi(
    data,
    `${endpoints.doctor.addDoctor}`
  );
  return response;
};

const onSlots = (data:any) => async (dispatch: Dispatch) => {
  const response = await (axiosInstance as AxiosInstance).getApiWithData(data,`${(endpoints).doctor.getSlots}`);
  return response;
};

export const doctorActions = {
  onDoctors,
  onAddDoctor,
  onSlots
};
