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
  getOneCategory: (id: number) => {
    return axiosInstance.get<TCategory>(`categories/${id}`);
  },
  editCategory: (id: number, name: string) => {
    return axiosInstance.put<TCategory>(`categories/${id}`, {
      name: name,
    });
  },
  deleteCategory: (id: number) => {
    return axiosInstance.delete<any>(`categories/${id}`);
  },
};
