import { electionHttpJson } from "@/utils/axios/base.Http";

export const getDistrictListService = async () => {
  const apiInstance = electionHttpJson();
  const response = apiInstance.get("/common/district");
  return response;
};

export const getDistrictByIdService = async (pk: number) => {
  const apiInstance = electionHttpJson();
  try {
    // Use query parameters for the request
    const response = await apiInstance.get("/common/district/", {
      params: { pk }, // Pass the `pk` as a query parameter
    });
    return response.data; // Return the data
  } catch (error) {
    console.error("Error fetching district by ID:", error);
    throw error;
  }
};
