import React, { ChangeEvent, useState } from "react";
import classes from "./AdminPanel.module.scss";
import { Button, Input, Select, Space } from "antd";
import clsx from "clsx";
import { useAppSelector } from "../../app/hooks";
import { CloseOutlined } from "@ant-design/icons";

import {
  adminPanelActions,
  fetchCreateCategory,
  fetchCreateQuestion,
  fetchDeleteCategory,
  fetchEditCategory,
  fetchGetCategories,
  fetchGetOneCategory,
} from "./AdminPanel.slice";
import { useBoundActions } from "../../app/store";

const allActions = {
  fetchDeleteCategory,
  fetchEditCategory,
  fetchGetOneCategory,
  fetchCreateCategory,
  fetchGetCategories,
  ...adminPanelActions,
};

const EditQuestion = () => {
  const boundActions = useBoundActions(allActions);
  const categories = useAppSelector(
    (state) => state.adminPanelReducer.categories
  );
  const handleChange = (label: number | string) => {
    if (typeof label === "number") setSelectedTheme(label);
  };
  const handleChangeDelete = (label: number | string) => {
    if (typeof label === "number") setSelectedThemeDelete(label);
  };
  const category = useAppSelector((state) => state.adminPanelReducer.category);
  const [selectedTheme, setSelectedTheme] = useState<number>(1);
  const [selectedThemeDelete, setSelectedThemeDelete] = useState<number>(1);
  const [newTitle, setNewTitle] = useState<string>("");
  const handleGetCategories = () => {
    boundActions.fetchGetCategories();
  };
  const handleGetCategory = () => {
    boundActions.fetchGetOneCategory(selectedTheme);
  };
  const handleEditCategory = () => {
    boundActions.fetchEditCategory({ id: selectedTheme, name: newTitle });
    setNewTitle("");
  };
  const handleDeleteCategory = () => {
    boundActions.fetchDeleteCategory(selectedThemeDelete);
  };
  console.log(selectedThemeDelete);
  return (
    <div className={classes.container}>
      <div className={classes["edit-category"]}>
        <h1>Изменить тему</h1>
        <Space.Compact className={classes["add-category"]}>
          <Select
            onClick={handleGetCategories}
            defaultValue="Выберете тему"
            className={classes.select}
            options={
              Array.isArray(categories)
                ? categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))
                : []
            }
            onChange={handleChange}
          />
          <Button type="primary" onClick={handleGetCategory}>
            OK
          </Button>
        </Space.Compact>
        <div>
          <Input
            defaultValue={category?.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setNewTitle(event.target.value)
            }
            value={newTitle}
          />
        </div>
        <Button
          type="primary"
          className={clsx("button", classes.button)}
          onClick={handleEditCategory}
        >
          Сохранить
        </Button>
      </div>

      <div>
        <h1>Удалить тему</h1>
        <Select
          onClick={handleGetCategories}
          defaultValue="Выберете тему"
          className={classes.select}
          options={
            Array.isArray(categories)
              ? categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))
              : []
          }
          onChange={handleChangeDelete}
        />
        <Button
          type="primary"
          className={clsx("button", classes.button)}
          danger
          icon={<CloseOutlined />}
          onClick={handleDeleteCategory}
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default EditQuestion;
