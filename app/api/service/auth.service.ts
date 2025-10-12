import { api_endpoint } from "../endpoint";
import api from "./api.service";

export const auth_service = {
  signup: async (data: {
    name: string;
    surname: string;
    phone: string;
    password: string;
    username: string;
  }) => {
    const res = await api.post(api_endpoint.signup, data);
    return res.data;
  },

  signin: async (data: {
    username: string;
    phone: string;
    password: string;
  }) => {
    const res = await api.post(api_endpoint.signin, data);
    return res.data;
    
  },
  verify: async (data: { phone: string; code: number }) => {
    const res = await api.post(api_endpoint.verify, data);
    const tokens = res.data;
    console.log("VERIFY URL:", api_endpoint.verify);
    if (tokens.accessToken)
      localStorage.setItem("accessToken", tokens.accessToken);
    if (tokens.refreshToken)
      localStorage.setItem("refreshToken", tokens.refreshToken);
    return tokens;
  },
};
