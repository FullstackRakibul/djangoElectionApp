import type { electionType } from "@/interface/election.interface"
import { electionHttpJson } from "@/utils/axios/base.Http"

export const getElectionTypeService = async () => {
  const response = await electionHttpJson().get("/election/election_type/")
  return response
}


export const createElectionTypeService = async (data: electionType) => {
  const payload = {
    election_type_name: data.election_type_name,
    election_type_name_ban: data.election_type_name_ban,
    created_by: 3
  }
  const response = await electionHttpJson().post("/election/election_type/", payload)
  return response
}