import { electionHttpJson } from "@/utils/axios/base.Http"


export const getElectionSeatService = async () => {
  const response = await electionHttpJson().get("/election/election_seat/")
  return response
}