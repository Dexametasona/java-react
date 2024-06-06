import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Login from "./Login";
import { useSelector } from "react-redux";

const Layout = () => {
  const { showLogin } = useSelector(
    (store) => store.userAuth
  );
  return (
    <main className="relative bg-primary-color py-6 px-20">
      <Navbar/>
      <Outlet />
      <Footer />

      {showLogin ? (
        <span
          // onClick={() => setShowLogin(false)}
          className=" fixed top-0 right-0 flex justify-center items-center bg-modal w-screen h-screen"
        >
          <Login/>
        </span>
      ) : null}
    </main>
  );
};

export default Layout;
