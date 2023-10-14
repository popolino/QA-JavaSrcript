import React from "react";
import classes from "./Authorization.module.scss";
import login from "../../assets/img/3249754.png";
import { Button } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import { useAppSelector } from "../../app/hooks";
import { authorizationActions, fetchLogin } from "./Authorization.slice";
import { useBoundActions } from "../../app/store";
import { Navigate } from "react-router-dom";
import { TAuthFields } from "../../api/index.types";

const allActions = {
  fetchLogin,
  ...authorizationActions,
};

const Login = () => {
  const boundActions = useBoundActions(allActions);
  const isAuth = useAppSelector((state) => state.authorizationReducer.isAuth);
  const { handleSubmit, control, formState } = useForm<TAuthFields>({
    mode: "all",
    defaultValues: { email: "", password: "" },
  });
  const onSubmit: SubmitHandler<TAuthFields> = (data) => {
    console.log(data);
    boundActions.fetchLogin(data);
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
          <h1>Добро пожаловать!</h1>
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
            Войти
          </Button>
          <div className={classes["bottom-container"]}>
            <p>Еще нет аккаунта?</p>
            <a href="/registration">Регистрация</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
