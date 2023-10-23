import axiosInstance from "./index";
import { TCategory, TQuestion, TQuestionResponse } from "./index.types";

export const questionsApi = {
  createQuestion: (values: TQuestion) => {
    return axiosInstance.post<TQuestionResponse>("questions", values);
  },
  getQuestions: () => {
    return axiosInstance.get<TQuestionResponse[]>(`questions`);
  },
  getOneQuestion: (id: number) => {
    return axiosInstance.get<TQuestionResponse[]>(`questions/${id}`);
  },
};
