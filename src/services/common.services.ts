import { electionHttpJson } from "@/utils/axios/base.Http";

export const getUserInfo = () => {

};

export const getAuthToken = () => {
  return localStorage.getItem('token') ?? "";
}

export const countryAddService = async (data: any) => {
  return await electionHttpJson().post("/common/country_list/", data);
}

export const getCountryListService = async () => {
  try {
    const axiosInstance = electionHttpJson(); // Get axios instance with proper headers
    const response = await axiosInstance.get("/common/country/");

    console.log("Country List Response:", response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching country list:", error);
    throw error; // Rethrow error for handling in the calling component
  }
};


export const updateCountryService = async (payload: any, id: any) => {
  return await electionHttpJson().put("/common/country_list/?pk=" + id, payload);
}

export const deleteCountryService = async (id: any) => {
  return await electionHttpJson().delete("/common/country_list/?pk=" + id);
}


// division services..

export const getDivisionListService = async () => {
  const apiInstance = electionHttpJson();
  const data = apiInstance.get("/common/division")
  return data;
}

export const DivisionService = async (values: any) => {
  return await electionHttpJson().post("/common/division_list/", values);
}
