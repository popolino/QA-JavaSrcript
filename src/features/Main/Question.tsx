import classes from "./Main.module.scss";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import { TQuestion } from "../../state";

const Question: React.FC<TQuestion> = ({
  id,
  question,
  answer,
  nameOfList,
  list,
}) => {
  const [viewAnswer, setViewAnswer] = useState<boolean>(false);
  useEffect(() => console.log(nameOfList), [nameOfList]);
  return (
    <>
      <div className={classes["top-container"]}>
        <h1>раздел</h1>
        <p>{question}</p>
      </div>
      <div className={classes["bottom-container"]}>
        {!viewAnswer && (
          <button
            className={classes.square}
            onClick={() => setViewAnswer(true)}
          >
            eye
          </button>
        )}
        <div className={clsx(classes.answer, { [classes.hide]: !viewAnswer })}>
          <p>{answer}</p>
          {nameOfList && (
            <>
              <p>{nameOfList}</p>
              <p>{list}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Question;
