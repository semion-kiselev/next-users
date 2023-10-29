import axios from "axios";

export const loginApi = (data: { email: string; password: string }) =>
  axios.post("/api/auth/login", data);

export const logoutApi = () => axios.post("/api/auth/logout", {});
