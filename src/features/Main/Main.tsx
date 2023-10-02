import React, { useState } from "react";
import classes from "./Main.module.scss";
import { Button } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import clsx from "clsx";

const Main = () => {
  const [viewAnswer, setViewAnswer] = useState<boolean>(false);

  return (
    <main>
      <div className={classes["top-container"]}>
        <h1>раздел</h1>
        <p>Lorem ispsum dolor sit ame?</p>
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            <br />
            Facere laborum natus optio quod repellat. Accusantium aspernatur
            fuga incidunt ipsum magni nulla similique tempora.
            <br />
            <br />
            Exercitationem molestias natus odit officia.
          </p>
          <p>
            Alias animi, autem consectetur eaque eos et nemo neque nesciunt odit
            optio provident, quas quo quod similique sint sunt ullam velit
            voluptas?
          </p>
        </div>
        <div className={classes.buttons}>
          <Button type="primary" icon={<CheckOutlined />} size="large">
            Вспомнил
          </Button>
          <Button ghost icon={<CloseOutlined />} size="large">
            Не вспомнил
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Main;
