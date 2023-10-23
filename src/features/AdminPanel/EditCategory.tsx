import React, { ChangeEvent, useState } from "react";
import classes from "./AdminPanel.module.scss";
import { Button, Input, Select, Space } from "antd";
import clsx from "clsx";
import { useAppSelector } from "../../app/hooks";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";

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
import {
  AntdButton,
  AntdInput,
  AntdSelect,
  AntdSelectButton,
} from "../../components/AntdComponents";
import { selectOptions } from "./utils";

const allActions = {
  fetchDeleteCategory,
  fetchEditCategory,
  fetchGetOneCategory,
  fetchCreateCategory,
  fetchGetCategories,
  ...adminPanelActions,
};

const EditCategory = () => {
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
  const metaStatus = useAppSelector(
    (state) => state.adminPanelReducer.metaStatus
  );
  const [selectedTheme, setSelectedTheme] = useState<number>(1);
  const [selectedThemeDelete, setSelectedThemeDelete] = useState<number | null>(
    null
  );
  const [newTitle, setNewTitle] = useState<string>("");
  const [buttonOk, setButtonOk] = useState<boolean>(false);

  const handleGetCategories = () => {
    boundActions.fetchGetCategories();
  };
  const handleGetCategory = () => {
    boundActions.fetchGetOneCategory(selectedTheme);
    setButtonOk(true);
  };
  const handleEditCategory = () => {
    boundActions.fetchEditCategory({ id: selectedTheme, name: newTitle });
    setNewTitle("");
    setButtonOk(false);
  };
  const handleDeleteCategory = () => {
    selectedThemeDelete &&
      boundActions.fetchDeleteCategory(selectedThemeDelete);
    setSelectedThemeDelete(null);
  };
  if (metaStatus === "loading")
    return (
      <div className="loading-icon">
        <LoadingOutlined />
      </div>
    );
  const categoriesOptions = selectOptions(categories, "id");
  console.log(selectedThemeDelete);
  return (
    <div className={classes.container}>
      <div className={classes["edit-category"]}>
        <h1>Изменить тему</h1>
        <AntdSelectButton
          onChange={handleChange}
          defaultValue="Выберете тему"
          onClickButton={handleGetCategory}
          onClickSelect={handleGetCategories}
          options={categoriesOptions}
        />
        <div>
          <AntdInput
            defaultValue={category?.name}
            setValue={setNewTitle}
            value={newTitle}
            disabled={!buttonOk}
          />
        </div>
        <AntdButton
          text="Сохранить"
          onClick={handleEditCategory}
          disabled={!newTitle}
        />
      </div>
      <div>
        <h1>Удалить тему</h1>
        <AntdSelect
          onChange={handleChangeDelete}
          onClick={handleGetCategories}
          defaultValue="Выберете тему"
          options={categoriesOptions}
        />
        <AntdButton
          disabled={!selectedThemeDelete}
          onClick={handleDeleteCategory}
          danger={true}
          text="Удалить"
          icon="cancel"
        />
      </div>
    </div>
  );
};

export default EditCategory;
