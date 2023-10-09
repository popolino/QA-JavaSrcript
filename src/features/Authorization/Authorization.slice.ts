import { createSlice } from "@reduxjs/toolkit";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../utils";
import { TLoginUserDto } from "./Authorization.types";

export interface IAuthorizationState {
  loginData: TLoginUserDto;
  isAuth: boolean;
  token: string;
  message: any;
  status: "idle" | "loading" | "failed";
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

export const initialState: IAuthorizationState = {
  loginData: {
    email: "",
    password: "",
    rememberMe: false,
  },
  isAuth: false,
  token: "",
  message: "",
  status: "idle",
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};

const authorizationSlice = createSlice({
  name: "authorizationReducer",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPendingAction, (state) => {
      state.status = "loading";
      state.message = "";
    });
    builder.addMatcher(isFulfilledAction, (state) => {
      state.status = "idle";
    });
    builder.addMatcher(isRejectedAction, (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    });
  },
});

export const { actions: authorizationActions, reducer: authorizationReducer } =
  authorizationSlice;
