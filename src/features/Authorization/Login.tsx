import React from "react";
import classes from "./Login.module.scss";
import login from "../../assets/img/3249754.png";
import { Button, Checkbox } from "antd";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import { useAppSelector } from "../../app/hooks";
import { authorizationActions } from "./Authorization.slice";
import { useBoundActions } from "../../app/store";
import { Navigate } from "react-router-dom";

const allActions = {
  ...authorizationActions,
};
export type TLoginFields = {
  email: string;
  password: string;
  rememberMe: boolean;
};
const Login = () => {
  const boundActions = useBoundActions(allActions);
  const isAuth = useAppSelector((state) => state.authorizationReducer.isAuth);

  const { handleSubmit, control, formState } = useForm<TLoginFields>({
    mode: "all",
    defaultValues: { email: "", password: "", rememberMe: false },
  });
  const onSubmit: SubmitHandler<TLoginFields> = (data) => {
    console.log(data);
    boundActions.setIsAuth(true);
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
          <h1>Welcome back</h1>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              validate: {
                hasCharsAfterAt: (value) =>
                  /.+./.test(value) || "Enter the email part before @",
                hasAtChar: (value) =>
                  /.+@/.test(value) ||
                  "The email address must contain the @ symbol",
                hasDotChar: (value) =>
                  /.+@.+\..+/i.test(value) || "Enter the email part after @",
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
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 symbols",
              },
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <CustomInput
                label="Password"
                type="password"
                error={!!error}
                message={error?.message}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox
                onChange={(e) => field.onChange(e.target.checked)}
                checked={field.value}
              >
                Checkbox
              </Checkbox>
            )}
          />

          <Button
            htmlType="submit"
            className="button"
            type="primary"
            size="large"
            disabled={!formState.isValid}
          >
            Login
          </Button>
          <div className={classes["bottom-container"]}>
            <p>Don’t have an account yet?</p>
            <a href="#">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
