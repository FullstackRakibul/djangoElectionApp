import { electionHttpJson } from "@/utils/axios/base.Http";

export const getElectionDataListService = async () => {
  const apiInstanct = electionHttpJson();
  const response = apiInstanct.get("/election/election_data");
  return response;
};
