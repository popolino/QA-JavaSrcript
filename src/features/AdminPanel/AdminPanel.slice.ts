import { TCategory, TQuestion } from "../../api/index.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../utils";
import { categoriesApi } from "../../api/categories.api";
import { questionsApi } from "../../api/questions.api";
import { questions } from "../../state";

export interface IAdminPanelState {
  categories: TCategory[];
  category: TCategory | null;
  selectedQuestions: TQuestion[];
  question: TQuestion | null;
  message: any;
  metaStatus: string;
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
  selectedQuestions: [],
  question: null,
  message: "",
  metaStatus: "idle",
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
    setSelectedQuestions: (state, action) => {
      state.selectedQuestions = action.payload;
    },
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
  extraReducers: (builder) => {
    /// EDIT CATEGORY
    builder.addCase(fetchEditCategory.pending, (state) => {
      state.meta.creating = true;
      state.metaStatus = "loading";
    });
    builder.addCase(fetchEditCategory.fulfilled, (state) => {
      state.meta.creating = false;
      state.metaStatus = "idle";
    });
    builder.addCase(fetchEditCategory.rejected, (state) => {
      state.meta.creating = false;
    });
    /// DELETE CATEGORY
    builder.addCase(fetchDeleteCategory.pending, (state) => {
      state.meta.creating = true;
      state.metaStatus = "loading";
    });
    builder.addCase(fetchDeleteCategory.fulfilled, (state) => {
      state.meta.creating = false;
      state.metaStatus = "idle";
    });
    builder.addCase(fetchDeleteCategory.rejected, (state) => {
      state.meta.creating = false;
    });
    /// CREATE QUESTION
    builder.addCase(fetchCreateQuestion.pending, (state) => {
      state.meta.creating = true;
      state.metaStatus = "loading";
    });
    builder.addCase(fetchCreateQuestion.fulfilled, (state) => {
      state.meta.creating = false;
      state.metaStatus = "idle";
    });
    builder.addCase(fetchCreateQuestion.rejected, (state) => {
      state.meta.creating = false;
    });
    //------------------------------------------------//
    //------------------------------------------------//
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
export const fetchGetQuestions = createAsyncThunk(
  "adminPanelReducer/getQuestions",
  async (categoryId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await questionsApi.getQuestions();
      const selectedQuestions = response.data.filter(
        (question) => question.category.id === categoryId
      );
      console.log(selectedQuestions);
      dispatch(adminPanelActions.setSelectedQuestions(selectedQuestions));
      return selectedQuestions;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);
export const fetchGetOneQuestion = createAsyncThunk(
  "adminPanelReducer/getOneQuestion",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await questionsApi.getOneQuestion(id);
      dispatch(adminPanelActions.setQuestion(response.data));
      console.log(response.data);
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
  async ({ id, name }: { id: number; name: string }, { rejectWithValue }) => {
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
  async (id: number, { rejectWithValue }) => {
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
