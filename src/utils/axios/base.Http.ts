
import axios, { type AxiosInstance } from "axios";
import { getAuthToken } from '@/services/common.services'

export const baseHttp = (baseUrl: string, headers: any = {
  "Content-Type": "application/json",
  "Accept": "application/json",
}): AxiosInstance => {

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
  });

  const authToken = getAuthToken();

  if (authToken) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  }

  for (const header in headers) {
    axiosInstance.defaults.headers.common[header] = headers[header];
  }

  return axiosInstance;
}


export const electionHttpJson = ():AxiosInstance=>{
    const baseUrl: string = import.meta.env.VITE_BASE_APP_ELECTION_API;
    const headers:any = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    return baseHttp(baseUrl, headers,);
}
