import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios";
import UserService from "./keycloak";

export const APIInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 120000
})

APIInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  return await UserService._kc.updateToken(5).then(() => {
    config.headers.Authorization = `Bearer ${UserService.getToken()}`
    return config
  }).catch(() => {
    void UserService.doLogin()
    return config
  })
})
