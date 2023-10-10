import Main from "../features/Main/Main";
import React from "react";
import Login from "../features/Authorization/Login";
import Registration from "../features/Authorization/Registration";

export const routes = [
  //Public
  {
    path: "login",
    label: "login",
    public: true,
    component: <Login />,
  },
  {
    path: "registration",
    label: "registration",
    public: true,
    component: <Registration />,
  },

  //Private
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
