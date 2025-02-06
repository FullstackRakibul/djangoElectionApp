import type { electionCenterInterface } from "@/interface/election.interface";
import { electionHttpJson } from "@/utils/axios/base.Http"


export const electionCenterListDataService = async () => {
  const apiInstance = electionHttpJson();
  const response = await apiInstance.get("/election/election_center")
  return response
}


export const electionCenterCreateService = async (data: electionCenterInterface) => {


  console.log("Payload data for Center Create request :", data)
  const apiInstance = electionHttpJson()
  const response = apiInstance.post("/election/election_center/", data)
  return response

}


export const deleteElectionCenterService = async (id: number) => {
  const apiInstance = electionHttpJson()
  const response = await apiInstance.delete("/election/election_center/?pk=" + id)
  return response
}