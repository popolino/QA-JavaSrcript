export type TCreateUserDto = {
  email: string;
  name: string;
  surname: string;
  password: string;
};
export type TLoginUserDto = {
  email: string;
  password: string;
};
export type TAuthResponse = {
  token: string;
};
export type TAuthFields = {
  email: string;
  password: string;
};

export type TUser = {
  id: number;
  email: string;
  role: "ADMIN" | "USER";
};
