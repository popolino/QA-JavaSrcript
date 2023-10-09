import Main from "../features/Main/Main";
import React from "react";
import Login from "../features/Authorization/Login";

export const routes = [
  //Public
  {
    path: "login",
    label: "login",
    public: true,
    component: <Login />,
  },
  {
    path: "main",
    label: "main",
    public: false,
    component: <Main />,
  },
  {
    path: "/",
    label: "main",
    public: false,
    component: <Main />,
  },
];
