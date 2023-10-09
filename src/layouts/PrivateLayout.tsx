import Navigation from "../features/Navigation/Navigation";
import Main from "../features/Main/Main";
import React from "react";
import { useAppSelector } from "../app/hooks";
import Login from "../features/Authorization/Login";

const PrivateLayout = () => {
  const isAuth = useAppSelector((state) => state.authorizationReducer.isAuth);
  if (!isAuth) return <Login />;
  return (
    <>
      <Navigation />
      <Main />
    </>
  );
};

export default PrivateLayout;
