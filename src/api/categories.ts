import type { Category } from "@/data/types";
import { apiClient } from "./client";
import { categories as mockCategories } from "@/data/mockData";
import { setUsingMockData } from "./mockDataState";

interface CategoriesResponse {
  data: Array<{ id: string; label: string }>;
}

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await apiClient.get<CategoriesResponse>("/categories");
      // Map backend format (id/label) to frontend format (value/label)
      return response.data.map((cat) => ({
        value: cat.id,
        label: cat.label,
      }));
    } catch {
      setUsingMockData(true);
      return mockCategories;
    }
  },
};
