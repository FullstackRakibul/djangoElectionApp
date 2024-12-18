

import axios, { type AxiosInstance } from "axios";
import { getAuthToken } from "@/services/common.services";

export const baseHttp = (
  baseUrl: string,
  additionalHeaders: Record<string, string> = {}
): AxiosInstance => {
  const authToken = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...additionalHeaders, // Add any additional headers dynamically
  };

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000, // Increased timeout for longer operations
    headers,
    withCredentials: true, // Include cookies in cross-origin requests
  });

  // Add interceptors if needed (e.g., global error handling, token refresh)
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("HTTP Error:", error.response?.data || error.message);
      // Future: Handle token refresh or other errors globally
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// Election-specific HTTP function
export const electionHttpJson = (): AxiosInstance => {
  const baseUrl: string = import.meta.env.VITE_BASE_APP_ELECTION_API;

  // Retrieve tokens from localStorage
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const headers: Record<string, string> = {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    //...(refreshToken ? { "x-refresh-token": refreshToken } : {}), // Add refresh token if available
  };

  return baseHttp(baseUrl, headers);
};
