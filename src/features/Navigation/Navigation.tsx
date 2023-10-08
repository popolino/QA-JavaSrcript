import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import classes from "./Navigation.module.scss";

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
  getItem("HTML", "1"),
  getItem("CSS", "2"),
  getItem("JavaScript", "3"),
  getItem("Option 3", "4"),
  getItem("Option 3", "5"),
];

const Navigation: React.FC = () => {
  return (
    <div className={classes.navigation}>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  );
};

export default Navigation;
