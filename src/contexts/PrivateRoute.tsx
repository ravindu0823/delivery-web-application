import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";
// import { ReactToast } from "../utils/ReactToast";
import { CustomLoadingPage } from "../pages/LoadingPage";

export const PrivateRoute = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }

  const { isSignedIn } = authContext;

  useEffect(() => {
    if (isSignedIn !== undefined) {
      setLoading(false);
    }
  }, [isSignedIn]);

  if (loading) {
    return <CustomLoadingPage />;
  }

  if (!isSignedIn) {
    /* ReactToast({
      message: "You must be signed in to view this page.",
      type: "error",
    }); */
    return <CustomLoadingPage />;
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
    /* ReactToast({
      message: "You are already signed in.",
      type: "error",
    }); */
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
