import Main from "../features/Main/Main";
import React from "react";
import Login from "../features/Authorization/Login";
import Registration from "../features/Authorization/Registration";
import Trainer from "../features/Trainer/Trainer";
import CreateCategoryQuestion from "../features/AdminPanel/CreateCategoryQuestion";
import Statistics from "../features/Statistics/Statistics";
import EditCategory from "../features/AdminPanel/EditCategory";
import EditQuestion from "../features/AdminPanel/EditQuestion";

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
    path: "/createQuestion",
    label: "createQuestion",
    public: false,
    component: <CreateCategoryQuestion />,
  },
  {
    path: "/editCategory",
    label: "editCategory",
    public: false,
    component: <EditCategory />,
  },
  {
    path: "/editQuestion",
    label: "editQuestion",
    public: false,
    component: <EditQuestion />,
  },
];
