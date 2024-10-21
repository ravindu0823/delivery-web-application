import axios from "axios";

export const GET_ORGANIZATION = "Organization";

export const ORGANIZATION_DATA_USERNAME = import.meta.env.VITE_ORGANIZATION_DATA_USERNAME as string;
export const ORGANIZATION_DATA_PASSWORD = import.meta.env.VITE_ORGANIZATION_DATA_PASSWORD as string;

export const ORGANIZATION_DATA_LOGIN = "User/login";
export const ORGANIZATION_DATA_REGISTER = "User/register";
export const ORGANIZATION_DATA_REFRESH = "User/refresh";
export const ORGANIZATION_DATA_GET_CATEGORY = "Product/get-category";
export const ORGANIZATION_DATA_GET_PRODUCTS = "Product/get-productlist";
export const ORGANIZATION_DATA_GET_PRODUCT_BY_ID = "Product/get-product";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
});
