import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "@components/index";

export const Layout = () => {
  return (
    <Fragment>
      <Header />
      <div style={{ paddingInline: "1rem", paddingBottom: "1rem" }}>
        <Outlet />
      </div>
    </Fragment>
  );
};
