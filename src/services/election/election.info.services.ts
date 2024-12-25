import { electionHttpJson } from "@/utils/axios/base.Http"

export const getElectionInfoDataService = async () => {
  const apiInstance = electionHttpJson()
  const response = apiInstance.get("/election/election_info")
  return response
} 