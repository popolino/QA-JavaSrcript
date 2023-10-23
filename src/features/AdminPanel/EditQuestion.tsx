import classes from "./AdminPanel.module.scss";
import { Button, Input, Select, Space } from "antd";
import React, { ChangeEvent, useState } from "react";
import clsx from "clsx";
import { useBoundActions } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import {
  AntdButton,
  AntdInput,
  AntdSelect,
  AntdSelectButton,
} from "../../components/AntdComponents";
import {
  adminPanelActions,
  fetchCreateCategory,
  fetchDeleteCategory,
  fetchEditCategory,
  fetchGetCategories,
  fetchGetOneCategory,
  fetchGetOneQuestion,
  fetchGetQuestions,
} from "./AdminPanel.slice";
import { selectOptions } from "./utils";

const allActions = {
  fetchGetOneQuestion,
  fetchGetQuestions,
  fetchDeleteCategory,
  fetchEditCategory,
  fetchGetOneCategory,
  fetchCreateCategory,
  fetchGetCategories,
  ...adminPanelActions,
};

const EditQuestion = () => {
  const boundActions = useBoundActions(allActions);

  const handleChange = (label: number | string) => {
    if (typeof label === "number") setSelectedTheme(label);
  };
  const handleChangeQuestion = (label: number | string) => {
    if (typeof label === "number") setSelectedQuestion(label);
  };
  const handleChangeDelete = (label: number | string) => {
    if (typeof label === "number") setSelectedThemeDelete(label);
  };
  const categories = useAppSelector(
    (state) => state.adminPanelReducer.categories
  );
  const selectedQuestions = useAppSelector(
    (state) => state.adminPanelReducer.selectedQuestions
  );

  const category = useAppSelector((state) => state.adminPanelReducer.category);
  const metaStatus = useAppSelector(
    (state) => state.adminPanelReducer.metaStatus
  );
  const [selectedTheme, setSelectedTheme] = useState<number>(1);
  const [selectedQuestion, setSelectedQuestion] = useState<number>(1);
  const [selectedThemeDelete, setSelectedThemeDelete] = useState<number>(1);
  const [newTitle, setNewTitle] = useState<string>("");
  const [buttonOkTheme, setButtonOkTheme] = useState<boolean>(false);
  const [buttonOkQuestion, setButtonOkQuestion] = useState<boolean>(false);

  const handleGetCategories = () => {
    boundActions.fetchGetCategories();
  };
  const handleGetCategory = () => {
    boundActions.fetchGetOneCategory(selectedTheme);
    setButtonOkTheme(true);
  };
  const handleGetQuestion = () => {
    boundActions.fetchGetOneQuestion(selectedQuestion);
    setButtonOkQuestion(true);
  };

  const handleDeleteCategory = () => {
    boundActions.fetchDeleteCategory(selectedThemeDelete);
  };
  const categoriesOptions = selectOptions(categories, "id");
  const questions = selectOptions(selectedQuestions, "title");

  const handleGetQuestions = () => {
    boundActions.fetchGetQuestions(selectedTheme);
  };
  return (
    <div className={classes.container}>
      <div className={classes["edit-category"]}>
        <h1>Изменить вопрос</h1>
        <AntdSelectButton
          onChange={handleChange}
          defaultValue="Выберете тему"
          onClickButton={handleGetCategory}
          onClickSelect={handleGetCategories}
          options={categoriesOptions}
        />
        <AntdSelectButton
          onChange={handleChangeQuestion}
          defaultValue="Выберете вопрос"
          onClickButton={handleGetQuestion}
          onClickSelect={handleGetQuestions}
          options={questions}
          disabled={!buttonOkTheme}
        />
        <div>
          <AntdInput
            defaultValue={category?.name}
            setValue={setNewTitle}
            value={newTitle}
            disabled={!buttonOkQuestion}
          />
        </div>
        <AntdButton
          text="Сохранить"
          onClick={() => console.log("save")}
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
          onClick={handleDeleteCategory}
          danger={true}
          text="Удалить"
          icon="cancel"
        />
      </div>
    </div>
  );
};

export default EditQuestion;
