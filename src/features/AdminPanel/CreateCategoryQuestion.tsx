import { Button, Input, Select, Space } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import classes from "./AdminPanel.module.scss";
import clsx from "clsx";
import { LoadingOutlined } from "@ant-design/icons";
import { useBoundActions } from "../../app/store";
import {
  adminPanelActions,
  fetchCreateCategory,
  fetchCreateQuestion,
  fetchGetCategories,
} from "./AdminPanel.slice";
import { useAppSelector } from "../../app/hooks";
import { apiKey, init } from "./utils";

const allActions = {
  fetchCreateQuestion,
  fetchCreateCategory,
  fetchGetCategories,
  ...adminPanelActions,
};

const CreateCategoryQuestion = () => {
  const boundActions = useBoundActions(allActions);
  const handleChange = (label: number | string) => {
    if (typeof label === "number") setSelectedTheme(label);
  };
  const categories = useAppSelector(
    (state) => state.adminPanelReducer.categories
  );
  const statusCreate = useAppSelector(
    (state) => state.adminPanelReducer.statusCreate
  );
  const [selectedTheme, setSelectedTheme] = useState<number>(1);
  const [answerText, setAnswerText] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [answerValue, setAnswerValue] = useState<any>("<p>Ответ</p>");
  const [question, setQuestion] = useState<string>("");

  const handleCreateCategory = (title: string) => {
    boundActions.fetchCreateCategory(title);
    setTheme("");
  };
  const handleCreateQuestion = () => {
    boundActions.fetchCreateQuestion({
      title: question,
      answer: answerValue,
      categoryId: selectedTheme,
    });
    setTheme("");
    setQuestion("");
    setAnswerText("");
  };
  const handleGetCategories = () => {
    boundActions.fetchGetCategories();
  };
  useEffect(() => console.log(theme), [theme]);
  if (statusCreate === "loading")
    return (
      <div className="loading-icon">
        <LoadingOutlined />
      </div>
    );
  return (
    <div className={classes.container}>
      <div>
        <h1>Добавьте тему вопросов</h1>
        <Space.Compact className={classes["add-category"]}>
          <Input
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTheme(event.target.value)
            }
            value={theme}
          />
          <Button type="primary" onClick={() => handleCreateCategory(theme)}>
            Добавить
          </Button>
        </Space.Compact>
      </div>
      <div>
        <h1>Добавьте вопрос</h1>
        <Select
          onClick={handleGetCategories}
          defaultValue="Тема"
          className={classes.select}
          options={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
          onChange={handleChange}
        />
        <Input
          value={question}
          placeholder="Вопрос"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setQuestion(event.target.value)
          }
        />
        <Editor
          apiKey={apiKey}
          onEditorChange={(newValue: any, editor: any) => {
            setAnswerValue(newValue);
            setAnswerText(editor.getContent({ format: "text" }));
          }}
          onInit={(evt, editor) => {
            setAnswerText(editor.getContent({ format: "text" }));
          }}
          value={answerText}
          init={init}
        />
      </div>
      <div className={classes.footer}>
        <Button
          htmlType="submit"
          className={clsx("button", classes["add-question"])}
          type="primary"
          size="large"
          onClick={handleCreateQuestion}
        >
          Добавить
        </Button>
      </div>
    </div>
  );
};

export default CreateCategoryQuestion;
