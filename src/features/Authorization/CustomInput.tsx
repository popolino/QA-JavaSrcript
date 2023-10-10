import React from "react";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import classes from "./Authorization.module.scss";

type TCustomTextFieldProps = {
  className?: string;
  label: string;
  type: "input" | "password";
  message?: string;
  error: boolean;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
};
const CustomTextField: React.FC<TCustomTextFieldProps> = ({
  className,
  label,
  message,
  error,
  value,
  type,
  onChange,
  onBlur,
}) => {
  return (
    <div>
      <div className={className}>
        {type === "input" ? (
          <Input
            className={classes["input-form"]}
            placeholder={label}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            status={error ? "error" : ""}
          />
        ) : (
          <Input.Password
            className={classes["input-form"]}
            placeholder={label}
            status={error ? "error" : ""}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        )}
        {message && (
          <div className={classes.message}>
            <div />
            <div>
              <p>{message}</p>
            </div>
            <div />
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomTextField;
