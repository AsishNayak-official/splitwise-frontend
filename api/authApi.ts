import axios from "./axiosInterceptor";

export const LoginUser = async (email:string,password:string) => {
  const res = await axios.post("/auth/login",{email,password});
  return res.data;
};
export const logoutUser = async () => {
  const res = await axios.get("/auth/logout");
  return res.data;
};
export const SignupUser = async (name:string,email:string,upiId:string,password:string) => {
  const res = await axios.post("/auth/signup",{name,email,upiId,password});
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await axios.get("/auth/me");
  return res.data;
};

