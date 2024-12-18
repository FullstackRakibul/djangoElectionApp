import { electionHttpJson } from "@/utils/axios/base.Http"

export const getDistrictListService = async () => {
  const apiInstance = electionHttpJson();
  const response = apiInstance.get("/common/district");
  return response;
}