import { electionHttpJson } from "@/utils/axios/base.Http"

export const getElectionTypeService = async () => {
  const response = await electionHttpJson().get("/election/election_type/")
  return response
} 