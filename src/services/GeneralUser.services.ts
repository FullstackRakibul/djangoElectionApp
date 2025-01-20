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

export const UserCreateService = async (values: GeneralUserInterface) => {
  const apiInstance = electionHttpJson()
  const payload = {

    username: values.username,
    password: values.password,
    email: values.email,
    phone: values.phone,
    user_type: values.user_type


  }
  const response = await apiInstance.post("/account/user/", payload)
  return response

}

export const UpdateUserService = async (values: GeneralUserInterface, id: number) => {
  try {
    const apiInstance = electionHttpJson();
    const response = await apiInstance.put(`/account/user/?pk=${id}`, values);
    return response;
  } catch (error: any) {
    console.error('Error updating user:', error);
    throw error;
  }
};




//user type
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