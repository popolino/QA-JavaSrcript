import React from "react";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import classes from "./Navigation.module.scss";
import { useBoundActions } from "../../app/store";
import { authorizationActions } from "../Authorization/Authorization.slice";
import { useNavigate } from "react-router-dom";

const allActions = {
  ...authorizationActions,
};

type TNavigationProps = {
  handleToggleMenu?: () => void;
  isMobile?: boolean;
};

const Navigation: React.FC<TNavigationProps> = ({
  isMobile,
  handleToggleMenu,
}) => {
  const boundActions = useBoundActions(allActions);

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    onClick: () => void
  ): MenuItem {
    return {
      key,
      label,
      onClick,
    } as MenuItem;
  }

  const navigate = useNavigate();
  const items: MenuItem[] = [
    getItem("Учить новые вопросы", "1", () => handleNavigation("/main")),
    getItem("Повторить вопросы", "2", () => handleNavigation("/training")),
    getItem("Статистика", "3", () => handleNavigation("/statistics")),
    getItem("Панель админа", "4", () => handleNavigation("/adminpanel")),
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
    handleToggleMenu && handleToggleMenu();
  };

  const handleLogout = () => {
    boundActions.setIsAuth(false);
    boundActions.setLogout();
  };
  return (
    <div
      className={isMobile ? classes["navigation-mobile"] : classes.navigation}
    >
      <Menu
        defaultSelectedKeys={isMobile ? [""] : ["1"]}
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
