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
    children?: MenuItem[] | null,
    onClick?: () => void
  ): MenuItem {
    return {
      key,
      label,
      children,
      onClick,
    } as MenuItem;
  }

  const navigate = useNavigate();
  const items: MenuItem[] = [
    getItem("Учить новые вопросы", "1", null, () => handleNavigation("/main")),
    getItem("Повторить вопросы", "2", null, () =>
      handleNavigation("/training")
    ),
    getItem("Статистика", "3", null, () => handleNavigation("/statistics")),
    getItem("Панель админа", "4", [
      getItem("Option 5", "5", null, () => handleNavigation("/createCategory")),
      getItem("Option 6", "6", null, () =>
        handleNavigation("/createQuestions")
      ),
    ]),
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

      <div className="button">
        <Button ghost size="large" onClick={handleLogout}>
          Выход
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
