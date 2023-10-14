import axiosInstance from "./index";
import { TCategory } from "./index.types";

export const categoriesApi = {
  createCategory: (name: string) => {
    return axiosInstance.post<TCategory>("categories", {
      name: `${name}`,
    });
  },
  getCategories: () => {
    return axiosInstance.get<TCategory[]>("categories?withQuestions=true");
  },
};
