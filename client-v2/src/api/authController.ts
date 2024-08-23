import { DecodedTokenProps } from "../utils/Props";

import { jwtDecode } from "jwt-decode";
import {
  axiosInstance,
  GET_CATEGORY,
  GET_PRODUCTS,
  USER_LOGIN,
  USER_REFRESH,
  USER_REGISTER,
} from "./config";
import { User } from "../models/User";

export const isTokenExpired = async (token: string) => {
  if (!token) return true;

  const decodedToken = jwtDecode<DecodedTokenProps>(token);

  if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
    return true;
  }

  return false;
};

export const getRefreshToken = async (
  accessToken: string,
  refreshToken: string
) => {
  if (!accessToken || !refreshToken) return null;

  try {
    const response = await axiosInstance.post(
      USER_REFRESH,
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
  if (!accessToken || !refreshToken) return null;

  try {
    if (await isTokenExpired(accessToken)) {
      return await getRefreshToken(accessToken, refreshToken);
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

export const userSignIn = async (user: User) => {
  try {
    const response = await axiosInstance.post(USER_LOGIN, {
      userName: user.username,
      password: user.password,
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

export const userSignUp = async (user: User) => {
  try {
    const response = await axiosInstance.post(USER_REGISTER, user);

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
  return `${GET_CATEGORY}?Organization=${organization}&page=${page}&limit=6`;
};

export const createGetCategoryUrl = (organization: string) => {
  return `${GET_CATEGORY}?Organization=${organization}`;
};

export const getProductUrl = (organization: string, categoryIndex: string) => {
  return `${GET_PRODUCTS}?Organization=${organization}&CategoryIndex=${categoryIndex}`;
}
