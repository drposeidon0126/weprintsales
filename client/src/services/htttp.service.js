import Axios from "axios";

const API_URL = process.env.API_URL;
Axios.defaults.baseURL = API_URL; // 'http://127.0.0.1:3000/auth/';

export class HttpService {
  _axios = Axios.create();

  addRequestInterceptor = (onFulfilled, onRejected) => {
    console.log("request intercepter===");
    this._axios.interceptors.request.use(onFulfilled, onRejected);
  };

  addResponseInterceptor = (onFulfilled, onRejected) => {
    this._axios.interceptors.response.use(onFulfilled, onRejected);
  };

  getWithParams = async (url, payload) => {
    return new Promise((resolve, reject) => {
      this._axios
        .get(`${url}`, {
          params: { ...payload },
        })
        .then((res) => resolve(res.data))
        .catch((ex) => {
          reject(ex.response);
        });
    });

    // return this._axios
    //   .get(`${url}`, {
    //     params: { ...payload },
    //   })
    //   .then((res) => {
    //     return res;
    //   })
    //   .catch((err) => {
    //     return err.response;
    //   });
  };

  get = async (url) => await this.request(this.getOptionsConfig("get", url));

  post = async (url, data) =>
    await this.request(this.getOptionsConfig("post", url, data));

  put = async (url, data) =>
    await this.request(this.getOptionsConfig("put", url, data));

  patch = async (url, data) =>
    await this.request(this.getOptionsConfig("patch", url, data));

  delete = async (url) =>
    await this.request(this.getOptionsConfig("delete", url));

  getOptionsConfig = (method, url, data) => {
    return {
      method,
      url,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };

  request(options) {
    return new Promise((resolve, reject) => {
      this._axios
        .request(options)
        .then((res) => resolve(res.data))
        .catch((ex) => {
          reject(ex.response);
        });
    });
  }
}

export default new HttpService();
