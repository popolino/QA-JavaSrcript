import React, { useState } from "react";

import { questions } from "../../state";
import Question from "./Question";
import classes from "./Main.module.scss";
import { Button } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
const Main = () => {
  const [page, setPage] = useState<number>(1);

  const handleConfirm = () => {
    setPage(page + 1);
  };
  const handleCancel = () => {
    setPage(page + 1);
  };

  return (
    <main>
      {questions
        .filter((question) => question.id === page)
        .map((question) => (
          <Question
            question={question.question}
            key={question.id}
            id={question.id}
            answer={question.answer}
            categoryId={question.categoryId}
            nameOfList={question.nameOfList}
            list={question.list}
          />
        ))}
      <div className={classes.buttons}>
        <Button
          type="primary"
          icon={<CheckOutlined />}
          size="large"
          onClick={handleConfirm}
        >
          Вспомнил
        </Button>
        <Button
          ghost
          icon={<CloseOutlined />}
          size="large"
          onClick={handleCancel}
        >
          Не вспомнил
        </Button>
      </div>
    </main>
  );
};

export default Main;
