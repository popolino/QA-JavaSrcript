import classes from "./Main.module.scss";
import clsx from "clsx";
import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";

type TQuestionProps = {
  question: string;
  answer: string;
  id: number;
  categoryId: number;
};

const Question: React.FC<TQuestionProps> = ({
  question,
  answer,
  id,
  categoryId,
}) => {
  const [viewAnswer, setViewAnswer] = useState<boolean>(false);

  return (
    <>
      <div className={classes["top-container"]}>
        <div>
          <h1>HTML</h1>
        </div>
        <p>{question}</p>
      </div>

      <div className={classes["bottom-container"]}>
        {!viewAnswer && (
          <button
            className={classes.square}
            onClick={() => setViewAnswer(true)}
          >
            <EyeOutlined />
          </button>
        )}
        <div className={clsx(classes.answer, { [classes.hide]: !viewAnswer })}>
          <p>{answer}</p>
        </div>
      </div>
    </>
  );
};

export default Question;
