import Main from "../features/Main/Main";
import React from "react";
import Login from "../features/Authorization/Login";
import Registration from "../features/Authorization/Registration";
import Training from "../features/Training/Training";
import AdminPanel from "../features/AdminPanel/AdminPanel";
import Statistics from "../features/Statistics/Statistics";

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
  {
    path: "/training",
    label: "training",
    public: false,
    component: <Training />,
  },
  {
    path: "/statistics",
    label: "statistics",
    public: false,
    component: <Statistics />,
  },
  {
    path: "/adminpanel",
    label: "adminpanel",
    public: false,
    component: <AdminPanel />,
  },
];
