import { electionHttpJson } from "@/utils/axios/base.Http";

export const getUserInfo = ()=>{

};

export const getAuthToken = ()=>{
  return localStorage.getItem('token')??"";
}

export const countryAddService = async(data:any)=>{
    return await electionHttpJson().post("/common/country_list/", data);
}

export const getCountryListService = async()=>{
  return await electionHttpJson().get("/common/country_list");
}

export const updateCountryService = async (payload:any, id:any)=>{
  return await electionHttpJson().put("/common/country_list/?pk="+id, payload);
}

export const deleteCountryService = async (id:any)=>{
  return await electionHttpJson().delete("/common/country_list/?pk="+id);
}