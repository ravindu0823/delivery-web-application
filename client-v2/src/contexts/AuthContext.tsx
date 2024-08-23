import { createContext, useEffect, useState } from "react";
import { User } from "../models/User";
import { AuthContextProviderProps, AuthContextType } from "../utils/Props";
import Cookies from "js-cookie";
import {
  userSignIn,
  userSignUp,
  validateAuthToken,
} from "../api/authController";
import {
  validateUserLoginData,
  validateUserRegisterData,
} from "../utils/userValidations";

// Create a context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Create a provider
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User>();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");

      if (!accessToken || !refreshToken) return setIsSignedIn(false);

      const validatedToken = await validateAuthToken(
        accessToken!,
        refreshToken!
      );

      if (validatedToken == null) {
        setUser(undefined);
        setIsSignedIn(false);
        return;
      }

      setUser({
        accessToken: validatedToken.token,
        refreshToken: validatedToken.refreshToken,
      });

      setIsSignedIn(true);
    };

    validateToken();
  }, []);

  const signIn = async (_user: User) => {
    if (validateUserLoginData(_user)) {
      const userData = await userSignIn(_user);

      if (!userData) {
        setIsSignedIn(false);
        setUser(undefined);
        return {
          status: false,
          message: `Login Failed!`,
        };
      }

      Cookies.set("accessToken", userData.token);
      Cookies.set("refreshToken", userData.refreshToken);

      setUser({
        accessToken: userData.token,
        refreshToken: userData.refreshToken,
      });

      setIsSignedIn(true);

      return {
        status: true,
        message: `Login Successful!`,
      };
    }
  };

  const signOut = () => {
    Cookies.remove(import.meta.env.ACCESS_TOKEN);
    Cookies.remove(import.meta.env.REFRESH_TOKEN);
    setIsSignedIn(false);
    setUser(undefined);

    return true;
  };

  const signUp = async (_user: User) => {
    if (validateUserRegisterData(_user)) {
      const userData = await userSignUp(_user);

      if (!userData) {
        setIsSignedIn(false);
        setUser(undefined);
        return {
          status: false,
          message: `Sign Up Failed!`,
        };
      }

      return {
        status: true,
        message: `Sign Up Successful Please login!`,
      };
    }
  };

  console.log(user);
  console.log(isSignedIn);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isSignedIn,
        setIsSignedIn,
        signIn,
        signOut,
        signUp,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
