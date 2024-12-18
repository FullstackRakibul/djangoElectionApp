import type { electionCenterInterface } from "@/interface/election.interface";
import { electionHttpJson } from "@/utils/axios/base.Http"


export const electionCenterListDataService = async () => {
  const apiInstance = electionHttpJson();
  const response = apiInstance.get("/election/election_center")
  return response
}


export const electionCenterCreateService = async (data: electionCenterInterface) => {
  const payload = {
    center_name: data.center_name,
    center_name_ban: data.center_name_ban,
    address: data.address
  }

  const apiInstance = electionHttpJson()
  const response = apiInstance.post("/election/election_center/", payload)
  return response

}