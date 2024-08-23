import axios from "axios";

export const ORGANIZATION = "1e7071f0-dacb-4a98-f264-08dcb066d923";

export const USER_LOGIN = "User/login";
export const USER_REGISTER = "User/register";
export const USER_REFRESH = "User/refresh";
export const GET_CATEGORY = "Product/get-category";
export const GET_PRODUCTS = "Product/get-productlist";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});
