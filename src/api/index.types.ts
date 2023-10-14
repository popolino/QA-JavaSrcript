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
export type TCategoryField = {
  name: string;
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

export type TCategory = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  questionsCount?: {
    learned: number;
    mastered: number;
    total: number;
  };
};