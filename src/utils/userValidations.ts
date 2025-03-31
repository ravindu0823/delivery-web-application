import { User } from "../models/User";
import { ReactToast } from "./ReactToast";

export const validateUserLoginData = (user: User) => {
  if (!user) return false;

  if (!user.username) {
    return ReactToast({ message: "Username is required", type: "error" });
  }

  if (!user.password) {
    return ReactToast({ message: "Password is required", type: "error" });
  }

  return true;
};

export const validateUserRegisterData = (user: User) => {
  if (!user) return false;

  if (!user.name) {
    return ReactToast({ message: "Name is required", type: "error" });
  }

  if (!user.email) {
    return ReactToast({ message: "Email is required", type: "error" });
  }

  if (!user.username) {
    return ReactToast({ message: "Username is required", type: "error" });
  }

  if (!user.password) {
    return ReactToast({ message: "Password is required", type: "error" });
  }

  return true;
};
