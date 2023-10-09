import React from "react";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import classes from "./Navigation.module.scss";
import { useBoundActions } from "../../app/store";
import { authorizationActions } from "../Authorization/Authorization.slice";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  type?: "group"
): MenuItem {
  return {
    key,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Учить новые вопросы", "1"),
  getItem("Повторить вопросы", "2"),
  getItem("Панель админа", "3"),
];
const allActions = {
  ...authorizationActions,
};
const Navigation: React.FC = () => {
  const boundActions = useBoundActions(allActions);

  const handleLogout = () => {
    boundActions.setIsAuth(false);
  };
  return (
    <div className={classes.navigation}>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        items={items}
      />
      <Button className="button" ghost size="large" onClick={handleLogout}>
        Выход
      </Button>
    </div>
  );
};

export default Navigation;
