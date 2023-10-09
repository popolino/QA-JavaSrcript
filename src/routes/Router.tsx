import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateLayout from "../layouts/PrivateLayout";
import PublicLayout from "../layouts/PublicLayout";
import React from "react";
import { routes } from "./routes";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PublicLayout />}>
        {routes
          .filter((route) => route.public)
          .map((route, i) => (
            <Route key={i} path={"/" + route.path} element={route.component} />
          ))}
      </Route>
      <Route element={<PrivateLayout />}>
        {routes
          .filter((route) => !route.public)
          .map((route, i) => (
            <Route key={i} path={"/" + route.path} element={route.component} />
          ))}
      </Route>
    </Routes>
  </BrowserRouter>
);
export default Router;
