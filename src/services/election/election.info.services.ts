import { electionHttpJson } from "@/utils/axios/base.Http"

export const getElectionInfoDataService = async () => {
  const apiInstance = electionHttpJson()
  const response = apiInstance.get("/election/election_info")
  return response
}

export const createElectionInfoDataService = async (data: any) => {
  const apiInstance = electionHttpJson()
  const response = await apiInstance.post("/election/election_info/", data)
  return response
}