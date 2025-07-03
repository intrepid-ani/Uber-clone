import React from "react";
import UberLogo from "../../components/uberLogo";
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <UberLogo />
      <Outlet />
    </>
  );
}

export default Layout;
