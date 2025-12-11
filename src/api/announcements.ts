import type { Announcement } from "@/data/types";
import { apiClient } from "./client";
import {
  setUsingMockData,
  getMockAnnouncements,
  getMockAnnouncementById,
  createMockAnnouncement,
  updateMockAnnouncement,
  deleteMockAnnouncement,
} from "./mockDataState";

interface AnnouncementsResponse {
  data: Announcement[];
}

interface AnnouncementResponse {
  data: Announcement;
}

interface CreateAnnouncementData {
  title: string;
  content: string;
  publicationDate: string;
  categories: string[];
}

interface UpdateAnnouncementData {
  title?: string;
  content?: string;
  publicationDate?: string;
  categories?: string[];
}

interface GetAllParams {
  categories?: string[];
  search?: string;
}

export const announcementsApi = {
  getAll: async (params?: GetAllParams): Promise<Announcement[]> => {
    try {
      let url = "/announcements";
      const searchParams = new URLSearchParams();

      if (params?.categories && params.categories.length > 0) {
        params.categories.forEach((cat) =>
          searchParams.append("category", cat),
        );
      }
      if (params?.search) {
        searchParams.append("search", params.search);
      }

      if (searchParams.toString()) {
        url += `?${searchParams.toString()}`;
      }

      const response = await apiClient.get<AnnouncementsResponse>(url);
      return response.data;
    } catch {
      setUsingMockData(true);
      let filtered = getMockAnnouncements();

      if (params?.categories && params.categories.length > 0) {
        filtered = filtered.filter((a) =>
          a.categories.some((c) => params.categories!.includes(c)),
        );
      }
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filtered = filtered.filter(
          (a) =>
            a.title.toLowerCase().includes(searchLower) ||
            a.content.toLowerCase().includes(searchLower),
        );
      }

      return filtered;
    }
  },

  getById: async (id: string): Promise<Announcement> => {
    try {
      const response = await apiClient.get<AnnouncementResponse>(
        `/announcements/${id}`,
      );
      return response.data;
    } catch {
      setUsingMockData(true);
      const announcement = getMockAnnouncementById(id);
      if (!announcement) {
        throw new Error("Announcement not found");
      }
      return announcement;
    }
  },

  create: async (data: CreateAnnouncementData): Promise<Announcement> => {
    try {
      const response = await apiClient.post<AnnouncementResponse>(
        "/announcements",
        data,
      );
      return response.data;
    } catch {
      setUsingMockData(true);
      return createMockAnnouncement(data);
    }
  },

  update: async (
    id: string,
    data: UpdateAnnouncementData,
  ): Promise<Announcement> => {
    try {
      const response = await apiClient.put<AnnouncementResponse>(
        `/announcements/${id}`,
        data,
      );
      return response.data;
    } catch {
      setUsingMockData(true);
      return updateMockAnnouncement(id, data);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/announcements/${id}`);
    } catch {
      setUsingMockData(true);
      deleteMockAnnouncement(id);
    }
  },
};
