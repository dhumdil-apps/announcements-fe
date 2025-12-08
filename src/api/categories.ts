import type { Category } from '../data/types';
import { apiClient } from './client';

interface CategoriesResponse {
  data: Array<{ id: string; label: string }>;
}

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<CategoriesResponse>('/categories');
    // Map backend format (id/label) to frontend format (value/label)
    return response.data.map((cat) => ({
      value: cat.id,
      label: cat.label,
    }));
  },
};
