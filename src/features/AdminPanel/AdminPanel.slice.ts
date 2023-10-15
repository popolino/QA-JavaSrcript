import { TCategory, TQuestion } from "../../api/index.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../utils";
import { categoriesApi } from "../../api/categories.api";
import { questionsApi } from "../../api/questions.api";

export interface IAdminPanelState {
  categories: TCategory[];
  category: TCategory | null;
  message: any;
  statusCreate: string;
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
  category: null,
  message: "",
  statusCreate: "idle",
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
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreateQuestion.pending, (state) => {
      state.meta.creating = true;
      state.statusCreate = "loading";
    });
    builder.addCase(fetchCreateQuestion.fulfilled, (state) => {
      state.meta.creating = false;
      state.statusCreate = "idle";
    });
    builder.addCase(fetchCreateQuestion.rejected, (state) => {
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

export const fetchCreateCategory = createAsyncThunk(
  "adminPanelReducer/createCategory",
  async (title: string, { rejectWithValue }) => {
    try {
      const response = await categoriesApi.createCategory(title);
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
export const fetchCreateQuestion = createAsyncThunk(
  "adminPanelReducer/createQuestion",
  async (values: TQuestion, { rejectWithValue }) => {
    try {
      const response = await questionsApi.createQuestion(values);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchGetOneCategory = createAsyncThunk(
  "adminPanelReducer/getOneCategory",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await categoriesApi.getOneCategory(id);
      dispatch(adminPanelActions.setCategory(response.data));
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchEditCategory = createAsyncThunk(
  "adminPanelReducer/editCategory",
  async (
    { id, name }: { id: number; name: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await categoriesApi.editCategory(id, name);
      console.log(id, name);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const fetchDeleteCategory = createAsyncThunk(
  "adminPanelReducer/deleteCategory",
  async (id: number, { rejectWithValue}) => {
    try {
      const response = await categoriesApi.deleteCategory(id);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
export const { actions: adminPanelActions, reducer: adminPanelReducer } =
  adminPanelSlice;
