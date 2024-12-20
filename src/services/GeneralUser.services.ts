import type { GeneralUserInterface, GeneralUserTypeInterface } from "@/interface/user.interface";
import { electionHttpJson } from "@/utils/axios/base.Http"



export const UserListServiceWithId = async () => {
  const apiInstance = electionHttpJson();
  const response = await apiInstance.get('/account/user');
  const userTypeResponse = await UserTypeDetailsService(response.data.data.user_type)

  console.log(response);
  return response
}


export const UserListService = async (): Promise<GeneralUserInterface[]> => {
  try {
    const response = await UserListServiceWithId()
    const userList: GeneralUserInterface[] = response.data.data;


    const enrichedUserList = await Promise.all(
      userList.map(async (user) => {
        const userTypeDetails: GeneralUserTypeInterface = await UserTypeDetailsService(user.user_type);
        return {
          ...user,
          user_type_name: userTypeDetails.user_type_name,
          user_type_name_ban: userTypeDetails.user_type_name_ban,
        };
      })
    );

    return enrichedUserList;
  } catch (error) {
    console.error('Error fetching user list:', error);
    throw error;
  }

}

export const UserTypeListService = async () => {
  const axiosInstance = electionHttpJson();
  const response = await axiosInstance.get('/account/usertype');
  console.log(response);
  return response
}


export const UserTypeDetailsService = async (pk: number) => {
  const axiosInstance = electionHttpJson();
  try {
    const response = await axiosInstance.get('/account/usertype/', {
      params: { pk }
    });
    return response.data
  } catch (error) {
    console.log("Type Details service error", error)
  }
}