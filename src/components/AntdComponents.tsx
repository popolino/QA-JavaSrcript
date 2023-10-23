import { Button, Input, Select, Space } from "antd";
import clsx from "clsx";
import React, { ChangeEvent } from "react";
import { CloseOutlined } from "@ant-design/icons";
import classes from "../features/AdminPanel/AdminPanel.module.scss";

type TButton = {
  icon?: "accept" | "cancel";
  className?: string;
  danger?: boolean;
  text: string;
  disabled?: boolean;
  onClick: () => void;
};

export const AntdButton: React.FC<TButton> = ({
  onClick,
  disabled,
  danger,
  text,
  className,
  icon,
}) => {
  return (
    <Button
      type="primary"
      className={clsx("button", className && className)}
      danger={danger ? danger : false}
      icon={icon === "cancel" && <CloseOutlined />}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

type TAntdSelectButton = {
  className?: string;
  defaultValue: string;
  options: any[];
  disabled?: boolean;
  onChange: (label: any) => void;
  onClickSelect: () => void;
  onClickButton: () => void;
};

export const AntdSelectButton: React.FC<TAntdSelectButton> = ({
  defaultValue,
  onChange,
  disabled,
  onClickSelect,
  onClickButton,
  options,
}) => {
  return (
    <Space.Compact className={classes["add-category"]}>
      <Select
        disabled={disabled}
        onClick={onClickSelect}
        defaultValue={defaultValue}
        className={classes.select}
        options={options}
        onChange={onChange}
      />

      <Button type="primary" onClick={onClickButton}>
        OK
      </Button>
    </Space.Compact>
  );
};

type TAntdSelect = {
  className?: string;
  defaultValue: string;
  options: any[];
  onChange: (label: any) => void;
  onClick: () => void;
};

export const AntdSelect: React.FC<TAntdSelect> = ({
  defaultValue,
  options,
  onChange,
  onClick,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      className={classes.select}
      options={options}
      onClick={onClick}
      onChange={onChange}
    />
  );
};

type TAntdInput = {
  className?: string;
  defaultValue?: string;
  value: string;
  disabled?: boolean;
  setValue: (value: string) => void;
};

export const AntdInput: React.FC<TAntdInput> = ({
  defaultValue,
  setValue,
  value,
  disabled,
}) => {
  return (
    <Input
      defaultValue={defaultValue}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value)
      }
      value={value}
      disabled={disabled}
    />
  );
};
