import { useBoundActions } from "../../app/store";
import { useAppSelector } from "../../app/hooks";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import classes from "./Authorization.module.scss";
import login from "../../assets/img/3249754.png";
import CustomInput from "./CustomInput";
import { Button } from "antd";
import React from "react";
import { TAuthFields } from "./Authorization.types";
import {
  authorizationActions,
  fetchCreateUser,
} from "./Authorization.slice";

const allActions = {
  fetchCreateUser,
  ...authorizationActions,
};

const Registration = () => {
  const boundActions = useBoundActions(allActions);
  const isAuth = useAppSelector((state) => state.authorizationReducer.isAuth);

  const { handleSubmit, control, formState } = useForm<TAuthFields>({
    mode: "all",
    defaultValues: { email: "", password: "" },
  });
  const onSubmit: SubmitHandler<TAuthFields> = (data) => {
    boundActions.fetchCreateUser(data);
    console.log(data);
  };

  if (isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className={classes.container}>
      <div>
        <img src={login} alt="" />
        <form
          className={classes["right-container"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1>Создайте аккаунт</h1>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Необходимо заполнить",
              validate: {
                hasCharsAfterAt: (value) =>
                  /.+./.test(value) || "Введите адрес почты до @",
                hasAtChar: (value) =>
                  /.+@/.test(value) || "Адрес почты должен содержать символ  @",
                hasDotChar: (value) =>
                  /.+@.+\..+/i.test(value) || "Введите часть после @",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <CustomInput
                label="Email"
                type="input"
                error={!!error}
                message={error?.message}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Необходимо заполнить",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <CustomInput
                label="Пароль"
                type="password"
                error={!!error}
                message={error?.message}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Button
            htmlType="submit"
            className="button"
            type="primary"
            size="large"
            disabled={!formState.isValid}
          >
            Зарегистрироваться
          </Button>
          <div className={classes["bottom-container"]}>
            <p>Уже зарегистрированы?</p>
            <a href="/login">Войти</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
