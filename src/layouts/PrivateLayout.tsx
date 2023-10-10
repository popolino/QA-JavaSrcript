import Navigation from "../features/Navigation/Navigation";
import Main from "../features/Main/Main";
import React, { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import Login from "../features/Authorization/Login";
import {
  authorizationActions,
  fetchAuthMe,
} from "../features/Authorization/Authorization.slice";
import { useBoundActions } from "../app/store";

const allActions = {
  fetchAuthMe,
  ...authorizationActions,
};

const PrivateLayout = () => {
  const authUser = useAppSelector(
    (state) => state.authorizationReducer.authUser
  );
  const boundActions = useBoundActions(allActions);

  useEffect(() => {
    boundActions.fetchAuthMe();
  }, []);
  console.log(authUser);

  if (!authUser) return <Login />;
  return (
    <>
      <Navigation />
      <Main />
    </>
  );
};

export default PrivateLayout;
