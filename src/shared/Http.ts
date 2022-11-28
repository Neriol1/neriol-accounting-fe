import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

export class Http {
  instance:AxiosInstance
  constructor(baseURL:string){
    this.instance = axios.create({
      baseURL
    })
  }

  get<R = unknown>( url:string, query?:Record<string,string>, config?:Omit<AxiosRequestConfig, 'url' | 'params' | 'method'>){
    return this.instance.request<R>({ ...config, url, params:query, method:"GET" })
  }

  post<R = unknown>(url:string, data?:Record<string,JSONValue>, config?:Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>){
    return this.instance.request<R>({ ...config, url, data, method:"POST" })
  }

  patch<R = unknown>( url:string, data?:Record<string,JSONValue>, config?:Omit<AxiosRequestConfig, 'url' | 'data' | 'method'>){
    return this.instance.request<R>({ ...config, url, data, method:"PATCH" })
  }

  delete<R = unknown>( url:string, query?:Record<string,string>, config?:Omit<AxiosRequestConfig, 'url' | 'method' | 'params'>){
    return this.instance.request<R>({ ...config, url, params:query, method:"DELETE" })
  }
}

export const http = new Http('/api/v1')

http.instance.interceptors.response.use(
  response =>{
    return response
  },
  error => {
    const axiosError = error as AxiosError
    if(axiosError.response?.status === 429){
      console.log('Too many requests');
    }
    throw error
  }
)