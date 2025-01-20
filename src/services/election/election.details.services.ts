import { electionHttpJson } from "@/utils/axios/base.Http"

export const GetElectionDetailsDataService = async () => {
  const response = await electionHttpJson().get("/election/election_details/")
  return response
}