import { Organization } from "../utils/Props";
import { axiosInstance, GET_ORGANIZATION } from "./config";

export const getOrganization = async (org: string, token: string) => {
  try {
    const response = await axiosInstance.get<Organization>(
      `${GET_ORGANIZATION}/${org}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status != 200)
      throw new Error(`HTTP error! Status: ${response.status}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching organization:", error);
    return null;
  }
};
