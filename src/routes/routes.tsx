import Main from "../features/Main/Main";
import React from "react";
import Login from "../features/Authorization/Login";
import Registration from "../features/Authorization/Registration";
import Trainer from "../features/Trainer/Trainer";
import CreateCategory from "../features/AdminPanel/CreateCategory";
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
    path: "/main",
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
    component: <Trainer />,
  },
  {
    path: "/statistics",
    label: "statistics",
    public: false,
    component: <Statistics />,
  },
  {
    path: "/createCategory",
    label: "createCategory",
    public: false,
    component: <CreateCategory />,
  },
];
