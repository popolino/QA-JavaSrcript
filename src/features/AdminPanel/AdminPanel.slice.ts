import { TCategory } from "../../api/index.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../utils";
import { categoriesApi } from "../../api/categories.api";

export interface IAdminPanelState {
  categories: TCategory[];
  message: any;
  status: "idle" | "loading" | "failed";
  meta: {
    fetching: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
  };
}

export const initialState: IAdminPanelState = {
  categories: [],
  message: "",
  status: "idle",
  meta: {
    fetching: false,
    creating: false,
    updating: false,
    deleting: false,
  },
};

const adminPanelSlice = createSlice({
  name: "adminPanelReducer",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
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

export const fetchCreateCategory = createAsyncThunk(
  "adminPanelReducer/createCategory",
  async (title: string, { rejectWithValue }) => {
    try {
      const response = await categoriesApi.createCategory(title);
      console.log(response);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
export const fetchGetCategories = createAsyncThunk(
  "adminPanelReducer/getCategories",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await categoriesApi.getCategories();
      dispatch(adminPanelActions.setCategories(response.data));
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const { actions: adminPanelActions, reducer: adminPanelReducer } =
  adminPanelSlice;
