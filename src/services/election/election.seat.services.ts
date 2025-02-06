import type { electionSeatInterface } from "@/interface/election.interface"
import { electionHttpJson } from "@/utils/axios/base.Http"


export const getElectionSeatService = async () => {
  const response = await electionHttpJson().get("/election/election_seat/")
  return response
}


export const createElectionSeatService = async (payload: any) => {
  const apiInstance = electionHttpJson()
  const response = await apiInstance.post("/election/election_seat/", payload)

  return response
}