
// // import axios, { type AxiosInstance } from "axios";
// // import { getAuthToken } from '@/services/common.services'

// // export const baseHttp = (baseUrl: string, headers: any = {
// //   "Content-Type": "application/json",
// //   "Accept": "application/json",
// // }): AxiosInstance => {

// //   const axiosInstance = axios.create({
// //     baseURL: baseUrl,
// //     timeout: 5000,
// //   });

// //   const authToken = getAuthToken();

// //   if (authToken) {
// //     axiosInstance.defaults.headers.common["HTTP_AUTHORIZATION"] = `Bearer ${authToken}`;
// //   }

// //   for (const header in headers) {
// //     axiosInstance.defaults.headers.common[header] = headers[header];
// //   }

// //   return axiosInstance;
// // }





// // export const electionHttpJson = (): AxiosInstance => {
// //   const baseUrl: string = import.meta.env.VITE_BASE_APP_ELECTION_API;

// //   // Dynamically retrieve tokens
// //   const token = localStorage.getItem('token');
// //   const accessToken = localStorage.getItem('access_token');
// //   const refreshToken = localStorage.getItem('refresh_token');

// //   // Set headers with tokens
// //   const headers: any = {

// //     ...(accessToken && { Authorization: `Bearer ${accessToken}` }), // Include Bearer token if available
// //     ...(refreshToken && { 'x-refresh-token': refreshToken }), // Custom header for refresh token
// //   };

// //   return baseHttp(
// //     baseURL: baseUrl,
// //     headers: headers,
// //   );
// // };


// // export const electionHttpJsonOld = (): AxiosInstance => {
// //   const baseUrl: string = import.meta.env.VITE_BASE_APP_ELECTION_API;
// //   const token = localStorage.getItem('token');
// //   const headers: any = {
// //     "Content-Type": "application/json",
// //     "Accept": "application/json",
// //     'Authorization': `Bearer ${token}`
// //   }
// //   return baseHttp(baseUrl, headers,);
// // }

// import axios, { type AxiosInstance } from "axios";
// import { getAuthToken } from "@/services/common.services";

// // Reusable base HTTP function
// export const baseHttp = (
//   baseUrl: string,
//   headers: Record<string, string> = {}
// ): AxiosInstance => {
//   // Create axios instance

//   const axiosInstance = axios.create({
//     baseURL: baseUrl,
//     timeout: 5000,
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json",
//       ...headers,
//     },
//   });

//   // Attach Authorization Token if available
//   const authToken = getAuthToken();
//   if (authToken) {
//     axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
//     //axiosInstance.defaults.headers.common["Authorization"] = authToken;
//   }

//   return axiosInstance;
// };



// export const electionHttpJson = (): AxiosInstance => {
//   const baseUrl: string = import.meta.env.VITE_BASE_APP_ELECTION_API;

//   // Retrieve tokens
//   const accessToken = localStorage.getItem("access_token");
//   const refreshToken = localStorage.getItem("refresh_token");

//   // Headers with conditional tokens
//   const headers: Record<string, string> = {
//     ...(accessToken && { "accessToken": accessToken }),
//     ...(refreshToken && { "x-refresh-token": refreshToken }),
//     ...(refreshToken && { "refresh_token": refreshToken }),
//   };

//   return baseHttp(baseUrl, headers);
// };

import axios, { type AxiosInstance } from "axios";
import { getAuthToken } from "@/services/common.services";

export const baseHttp = (
  baseUrl: string,
  headers: Record<string, string> = {}
): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers, // Add any additional headers
    },
    withCredentials: true, // For cookies
  });

  // Attach Authorization Token if available
  const authToken = getAuthToken();
  if (authToken) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  }

  return axiosInstance;
};

// Election-specific HTTP function
export const electionHttpJson = (): AxiosInstance => {
  const baseUrl: string = import.meta.env.VITE_BASE_APP_ELECTION_API;

  // Retrieve tokens from localStorage
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  // Add tokens to headers if they exist
  const headers: Record<string, string> = {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(refreshToken ? { "x-refresh-token": refreshToken } : {}),
  };

  return baseHttp(baseUrl, headers);
};
