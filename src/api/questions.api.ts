import axiosInstance from "./index";
import { TCategory, TQuestion, TQuestionResponse } from "./index.types";

export const questionsApi = {
  createQuestion: (values: TQuestion) => {
    return axiosInstance.post<TQuestionResponse>("questions", values);
  },
  getCategories: () => {
    return axiosInstance.get<TCategory[]>("categories?withQuestions=true");
  },
};
