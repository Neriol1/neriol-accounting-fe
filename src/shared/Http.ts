import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { mockItemCreate, mockSession, mockTagIndex } from "../mock/mock";

type GetConfig = Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>
type PostConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type PatchConfig = Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>
type DeleteConfig = Omit<AxiosRequestConfig, 'url' | 'method' | 'params'>

export class Http {
  instance:AxiosInstance
  constructor(baseURL:string){
    this.instance = axios.create({
      baseURL
    })
  }

  get<R = unknown>( url:string, query?:Record<string,string>, config?: GetConfig){
    return this.instance.request<R>({ ...config, url, params:query, method:"GET" })
  }

  post<R = unknown>(url:string, data?:Record<string,JSONValue>, config?:PostConfig){
    return this.instance.request<R>({ ...config, url, data, method:"POST" })
  }

  patch<R = unknown>( url:string, data?:Record<string,JSONValue>, config?:PatchConfig){
    return this.instance.request<R>({ ...config, url, data, method:"PATCH" })
  }

  delete<R = unknown>( url:string, query?:Record<string,string>, config?:DeleteConfig){
    return this.instance.request<R>({ ...config, url, params:query, method:"DELETE" })
  }
}

const mock = (response:AxiosResponse) =>{
  if(!['localhost','127.0.0.1','172.20.10.11'].includes(location.hostname)) return false
  switch(response.config?.params?._mock){
    case 'tagIndex':
      [response.status, response.data] = mockTagIndex(response.config)
      return true
    // case 'itemCreate':
    //   [response.status, response.data] = mockItemCreate(response.config)
    //   return true
    // case 'itemIndex':
    //   [response.status, response.data] = mockItemIndex(response.config)
    //   return true
    // case 'tagCreate':
    //   [response.status, response.data] = mockTagCreate(response.config)
    case 'session':
      [response.status, response.data] = mockSession(response.config)
      return true
    case 'itemCreate':
      [response.status, response.data] = mockItemCreate(response.config)
      return true
  }
  return false
}

export const http = new Http('/api/v1')

http.instance.interceptors.request.use((config) => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`
  }
  return config
})

http.instance.interceptors.response.use(
  response =>{
    mock(response)
    return response
  },
  error => {
    if(mock(error.response)){
      return error.response
    }else{
      throw error
    } 
  }
)

http.instance.interceptors.response.use(
  response =>{
    return response
  },
  error => {
    const axiosError = error as AxiosError
    if (axiosError.response?.status === 429) {
      console.log('Too many requests')
    }
    throw error
  }
)