import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { ReactToast } from "../utils/ReactToast";

export const PrivateRoute = () => {
  const authContext = useContext(AuthContext);

  // Ensure authContext is not undefined before accessing its properties
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }

  const { isSignedIn } = authContext;
  // console.log(isSignedIn);

  if (!isSignedIn) {
    ReactToast({
      message: "You must be signed in to view this page.",
      type: "error",
    });
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const PrivateRouteForAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }

  const { isSignedIn } = authContext;
  // console.log(isSignedIn);

  if (isSignedIn) {
    ReactToast({
      message: "You are already signed in.",
      type: "error",
    });
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
