import { electionHttpJson } from "@/utils/axios/base.Http";

export const getElectionDataListService = async () => {
  const apiInstanct = electionHttpJson();
  const response = apiInstanct.get("/election/election_data");
  return response;
};


export const createElectionDataService = async (payload: any) => {
  const apiInstance = electionHttpJson();
  const response = apiInstance.post("/election/election_data/", payload);
  return response;
}