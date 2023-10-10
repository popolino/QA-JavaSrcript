import {
  TAuthFields,
  TAuthResponse,
  TUser,
} from "../features/Authorization/Authorization.types";
import axiosInstance from "./index";

export const authorizationApi = {
  createUser: (formValues: TAuthFields) => {
    return axiosInstance.post<TAuthResponse>("auth/registration", formValues);
  },
  loginUser: (formValues: TAuthFields) => {
    return axiosInstance.post<TAuthResponse>("auth/login", formValues);
  },
  // logoutUser: () => {
  //   return axiosInstance.delete("auth/logout");
  // },
  authMe: () => {
    return axiosInstance.get<TUser>("auth/me");
  },
  // refresh: () => {
  //   return axios.put<TAuthResponse>(`${BASE_URL}auth/refresh`, null, {
  //     withCredentials: true,
  //   });
  // },
};
