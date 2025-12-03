import axios from "axios";

axios.defaults.baseURL = process?.env?.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4500/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

//add more things
//interceptors to send authorization
axios.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = localStorage.getItem('AccessToken');
    config.headers.Authorization = AUTH_TOKEN ? `Bearer ${AUTH_TOKEN}` : '';
    return config;
  },
  function (error) {
    throw error;
  },
);


export default axios;