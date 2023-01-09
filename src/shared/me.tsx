import { AxiosResponse } from "axios";
import { http } from "./Http"

export let mePromise:Promise<AxiosResponse<Resource<User>>>

export const refreshMe = () => {
  mePromise = http.get<Resource<User>>('/me')
  return mePromise
}

export const fetchMe = refreshMe