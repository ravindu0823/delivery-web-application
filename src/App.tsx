import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { PrivateRoute, PrivateRouteForAuth } from "./contexts/PrivateRoute";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/:orgId" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route element={<PrivateRouteForAuth />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
        <Toaster position="bottom-right" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
