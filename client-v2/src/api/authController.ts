import { DecodedTokenProps } from "../utils/Props";

import { jwtDecode } from "jwt-decode";
import {
  axiosInstance,
  ORGANIZATION_DATA_GET_CATEGORY,
  ORGANIZATION_DATA_GET_PRODUCTS,
  ORGANIZATION_DATA_LOGIN,
  ORGANIZATION_DATA_PASSWORD,
  ORGANIZATION_DATA_REFRESH,
  ORGANIZATION_DATA_REGISTER,
  ORGANIZATION_DATA_USERNAME,
} from "./config";
import { User } from "../models/User";

export const isTokenAboutToExpired = async (token: string) => {
  if (!token) return true;

  const decodedToken = jwtDecode<DecodedTokenProps>(token);
  const expiryTime = decodedToken.exp * 1000;
  const currentTime = Date.now();
  const refreshThreshold = 60 * 1000; // 1 minute in milliseconds

  if (currentTime >= expiryTime - refreshThreshold) {
    // Trigger refresh if token is about to expire in less than 1 minute
    return true;
  }

  return false;
};

export const isTokenExpired = async (token: string) => {
  if (!token) return true;

  const decodedToken = jwtDecode<DecodedTokenProps>(token);
  const expiryTime = decodedToken.exp * 1000;
  const currentTime = Date.now();

  if (currentTime >= expiryTime) {
    return true;
  }

  return false;
};

export const getRefreshTokenForOrganizationData = async (
  accessToken: string,
  refreshToken: string
) => {
  if (!accessToken || !refreshToken) return null;

  try {
    const response = await axiosInstance.post(
      ORGANIZATION_DATA_REFRESH,
      {
        // Pass the tokens in the request body
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.statusText)
      throw new Error(`HTTP error! Status: ${response.status}`);

    return {
      token: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

export const validateAuthToken = async (
  accessToken: string,
  refreshToken: string
) => {
  try {
    const user: User = {
      accessToken: "temp",
    };

    if (!accessToken || !refreshToken) {
      return await organizationDataLogin(user);
    }

    if (await isTokenExpired(accessToken)) {
      return await organizationDataLogin(user);
    }

    if (await isTokenAboutToExpired(accessToken)) {
      return await getRefreshTokenForOrganizationData(
        accessToken,
        refreshToken
      );
    }

    return {
      token: accessToken,
      refreshToken: refreshToken,
    };
  } catch (error) {
    console.error("Error validating token:", error);
    return null;
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const organizationDataLogin = async (_user: User) => {
  try {
    const response = await axiosInstance.post(ORGANIZATION_DATA_LOGIN, {
      userName: ORGANIZATION_DATA_USERNAME,
      password: ORGANIZATION_DATA_PASSWORD,
    });

    if (!response.statusText)
      throw new Error(`HTTP error! Status: ${response.status}`);

    return {
      token: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };
  } catch (error) {
    console.error("Error signing in user:", error);
    return null;
  }
};

export const organizationDataRegister = async (user: User) => {
  try {
    const response = await axiosInstance.post(ORGANIZATION_DATA_REGISTER, user);

    if (response.status !== 204)
      throw new Error(`HTTP error! Status: ${response.status}`);

    return true;
  } catch (error) {
    console.error("Error signing up user:", error);
    return false;
  }
};

export const createGetCategoryUrlWithPageLimit = (
  organization: string,
  page: string
) => {
  return `${ORGANIZATION_DATA_GET_CATEGORY}?Organization=${organization}&page=${page}&limit=6`;
};

export const createGetCategoryUrl = (organization: string) => {
  return `${ORGANIZATION_DATA_GET_CATEGORY}?Organization=${organization}`;
};

export const getProductUrl = (organization: string, categoryIndex: string) => {
  return `${ORGANIZATION_DATA_GET_PRODUCTS}?Organization=${organization}&CategoryIndex=${categoryIndex}`;
};
