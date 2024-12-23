import { electionHttpJson } from "@/utils/axios/base.Http";
import { httpServiceCountryList } from "./country.services";
import type { Country } from "@/interface/common.interface";
import type { electionPartyInterfcae } from "@/interface/election.interface";

export const getUserInfo = () => { };

export const getAuthToken = () => {
  return localStorage.getItem("token") ?? "";
};

export const countryAddService = async (data: Country) => {
  const payload = {
    country_name: data.country_name,
    country_name_ban: data.country_name_ban,
  };
  const apiInstance = electionHttpJson();
  const response = apiInstance.post("/common/country/", payload);
  return response;
};

export const getCountryListService = async () => {
  const apiInstance = electionHttpJson();
  const data = apiInstance.get("/common/country");
  console.log("service Check Response :-", data);
  return data;
};

export const updateCountryService = async (payload: any, id: any) => {
  return await electionHttpJson().put(
    "/common/country_list/?pk=" + id,
    payload
  );
};

export const deleteCountryService = async (id: any) => {
  return await electionHttpJson().delete("/common/country_list/?pk=" + id);
};

// division services..

export const getDivisionListService = async () => {
  const apiInstance = electionHttpJson();
  const data = await apiInstance.get("/common/division");
  return data;
};
// district services ...

export const getDistrictListService = async () => {
  const apiInstance = electionHttpJson();
  const data = await apiInstance.get("/common/district");
  return data;
};

export const postDivisionService = async (values: any) => {
  const apiInstance = electionHttpJson();
  const data = apiInstance.post("/common/division_list/", values);
  return data;
};

// word Service

export const getWordListService = async () => {
  const apiInstance = electionHttpJson();
  const response = apiInstance.get("/common/ward");
  return response;
};

// union service

export const getUnionListService = async () => {
  const apiInstance = electionHttpJson();
  const response = apiInstance.get("/common/union");
  return response;
};

// upzillah services

export const getUpzillahListService = async () => {
  const apiInstance = electionHttpJson();
  const response = apiInstance.get("/common/upazila");
  return response;
};

//party

export const getElectionPartyService = async () => {
  const apiInstance = electionHttpJson();
  const response = apiInstance.get("/common/party");
  return response;
};

export const postElectionPartyService = async (
  values: electionPartyInterfcae
) => {
  const apiInstance = electionHttpJson();
  const response = apiInstance.post("/common/party/", values);
  return response;
};
