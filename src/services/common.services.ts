import { electionHttpJson } from "@/utils/axios/base.Http";
import { httpServiceCountryList } from "./country.services";

export const getUserInfo = () => {

};

export const getAuthToken = () => {
  return localStorage.getItem('token') ?? "";
}

export const countryAddService = async (data: any) => {
  return await electionHttpJson().post("/common/country_list/", data);
}

export const getCountryListService = async () => {

  const res = httpServiceCountryList.get("/common/country/");
  console.log("service Check Response ::::", res)
  return await httpServiceCountryList.get("/common/country/");
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
  const data = apiInstance.get("/common/division/")
  return data;
}

export const DivisionService = async (values: any) => {
  return await electionHttpJson().post("/common/division_list/", values);
}
