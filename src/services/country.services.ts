import { electionHttpJson } from "@/utils/axios/base.Http";

export const httpServiceCountryList = {
  async get(url: string, params?: Record<string, any>) {
    try {
      const response = await electionHttpJson().get(url, { params });
      return response.data;
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  },

  async post(url: string, data: Record<string, any>) {
    try {
      const response = await electionHttpJson().post(url, data);
      return response.data;
    } catch (error) {
      console.error("POST request failed:", error);
      throw error;
    }
  },

  async put(url: string, data: Record<string, any>) {
    try {
      const response = await electionHttpJson().put(url, data);
      return response.data;
    } catch (error) {
      console.error("PUT request failed:", error);
      throw error;
    }
  },

  async delete(url: string) {
    try {
      const response = await electionHttpJson().delete(url);
      return response.data;
    } catch (error) {
      console.error("DELETE request failed:", error);
      throw error;
    }
  },
};
