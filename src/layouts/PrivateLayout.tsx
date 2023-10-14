import Navigation from "../features/Navigation/Navigation";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import Login from "../features/Authorization/Login";
import {
  authorizationActions,
  fetchAuthMe,
} from "../features/Authorization/Authorization.slice";
import { useBoundActions } from "../app/store";
import { Outlet } from "react-router-dom";
import { MenuOutlined } from "@ant-design/icons";

const allActions = {
  fetchAuthMe,
  ...authorizationActions,
};

const PrivateLayout = () => {
  const authUser = useAppSelector(
    (state) => state.authorizationReducer.authUser
  );
  const boundActions = useBoundActions(allActions);

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const handleToggleMenu = () => {
    openMenu ? setOpenMenu(false) : setOpenMenu(true);
  };

  useEffect(() => {
    boundActions.fetchAuthMe();
    console.log(authUser);
  }, []);

  if (!authUser) return <Login />;
  return (
    <>
      <div className="menu" onClick={handleToggleMenu}>
        <MenuOutlined />
      </div>

      {openMenu && <Navigation isMobile handleToggleMenu={handleToggleMenu} />}
      <Navigation />
      {!openMenu && <Outlet />}
    </>
  );
};

export default PrivateLayout;
