import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Details from "../pages/Details";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* <Route element={<PublicRoutes />}> */}
          <Route index path="/" element={<Dashboard />} />
        {/* </Route> */}
        {/* <Route element={<PrivateRoutes />}> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/details" element = {<Details/>} />
        {/* </Route> */}
      </Route>
    </Routes>
  );
};

export default AppRouter;
