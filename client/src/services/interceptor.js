import HttpService from "./htttp.service";
import { useNavigate } from "react-router-dom";

export const setupAxiosInterceptors = (onUnauthenticated) => {
	
  const onRequestSuccess = async (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `${token}`;
    return config;
  };
  const onRequestFail = (error) => {
    Promise.reject(error);
  }
  HttpService.addRequestInterceptor(onRequestSuccess, onRequestFail);

  const onResponseSuccess = (response) => {
    return response
  };

  const onResponseFail = (error) => {
    const status = error.status || error.response.status;
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(error);
  };
  HttpService.addResponseInterceptor(onResponseSuccess, onResponseFail);
};
