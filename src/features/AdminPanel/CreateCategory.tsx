import { Button, Input, Select, Space } from "antd";
import React, { ChangeEvent, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import classes from "./AdminPanel.module.scss";
import clsx from "clsx";
import { useBoundActions } from "../../app/store";
import {
  adminPanelActions,
  fetchCreateCategory,
  fetchGetCategories,
} from "./AdminPanel.slice";
import { useAppSelector } from "../../app/hooks";
import { apiKey, init } from "./utils";

const allActions = {
  fetchCreateCategory,
  fetchGetCategories,
  ...adminPanelActions,
};

const CreateCategory = () => {
  const boundActions = useBoundActions(allActions);
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  const categories = useAppSelector(
    (state) => state.adminPanelReducer.categories
  );
  const isAuth = useAppSelector((state) => state.authorizationReducer.isAuth);

  const [text, setText] = useState<string>("");
  const [value, setValue] = useState<any>("<p>HelloWorld!</p>");

  const [title, setTitle] = useState<string>("");
  const handleCreateCategory = (title: string) => {
    boundActions.fetchCreateCategory(title);
  };
  const handleGetCategories = () => {
    boundActions.fetchGetCategories();
  };
  return (
    <div className={classes.container}>
      <div>
        <h1>Добавьте тему вопросов</h1>
        <Space.Compact className={classes["add-category"]}>
          <Input
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
          />
          <Button type="primary" onClick={() => handleCreateCategory(title)}>
            Добавить
          </Button>
        </Space.Compact>
      </div>
      <div>
        <h1>Добавьте вопрос</h1>
        <div className={classes.select}>
          <h2>Выбрать тему вопроса: </h2>
          <Select
            onClick={handleGetCategories}
            defaultValue="Тема"
            style={{ width: 120 }}
            onChange={handleChange}
            options={categories.map((category) => ({
              value: category.name,
            }))}
          />
        </div>
        <Editor
          apiKey={apiKey}
          onEditorChange={(newValue: any, editor: any) => {
            setValue(newValue);
            setText(editor.getContent({ format: "text" }));
          }}
          onInit={(evt, editor) => {
            setText(editor.getContent({ format: "text" }));
          }}
          value={value}
          init={init}
        />
      </div>
      <div className={classes.footer}>
        <Button
          htmlType="submit"
          className={clsx("button", classes["add-question"])}
          type="primary"
          size="large"
        >
          Добавить
        </Button>
      </div>
    </div>
  );
};

export default CreateCategory;
