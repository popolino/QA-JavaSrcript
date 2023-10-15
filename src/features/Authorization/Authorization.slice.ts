import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../utils";
import { TAuthFields, TLoginUserDto, TUser } from "../../api/index.types";
import { authorizationApi } from "../../api/authorization.api";

export interface IAuthorizationState {
  loginData: TLoginUserDto;
  isAuth: boolean;
  authUser: TUser | null;
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
  },
  isAuth: false,
  authUser: null,
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
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setLogout: (state) => {
      state.authUser = null;
      localStorage.setItem("token", "");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.meta.creating = true;
    });
    builder.addCase(fetchLogin.fulfilled, (state) => {
      state.meta.creating = false;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.meta.creating = false;
    });
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

export const fetchCreateUser = createAsyncThunk(
  "authorizationReducer/createUser",
  async (formValues: TAuthFields, { rejectWithValue, dispatch }) => {
    try {
      const response = await authorizationApi.createUser(formValues);
      const loginData = {
        email: formValues.email,
        password: formValues.password,
      };
      dispatch(fetchLogin(loginData));
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "authorizationReducer/fetchLogin",
  async (formValues: TAuthFields, { rejectWithValue, dispatch }) => {
    try {
      const response = await authorizationApi.loginUser(formValues);
      dispatch(authorizationSlice.actions.setIsAuth(true));
      localStorage.setItem("token", `${response.data.token}`);
      return response.data;
    } catch (e: any) {
      console.log(e.message);
      return rejectWithValue(e.message);
    }
  }
);

export const fetchAuthMe = createAsyncThunk(
  "authReducer/fetchAuthMe",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await authorizationApi.authMe();
      dispatch(authorizationSlice.actions.setIsAuth(true));
      dispatch(authorizationActions.setAuthUser(response.data));
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const { actions: authorizationActions, reducer: authorizationReducer } =
  authorizationSlice;
