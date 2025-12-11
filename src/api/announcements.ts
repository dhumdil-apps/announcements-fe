import type { Announcement } from "@/data/types";
import { apiClient } from "./client";
import { announcements as mockAnnouncements } from "@/data/mockData";
import { setUsingMockData } from "./mockDataState";

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

export const announcementsApi = {
  getAll: async (): Promise<Announcement[]> => {
    try {
      const response =
        await apiClient.get<AnnouncementsResponse>("/announcements");
      return response.data;
    } catch {
      setUsingMockData(true);
      return mockAnnouncements;
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
      const announcement = mockAnnouncements.find((a) => a.id === id);
      if (!announcement) {
        throw new Error("Announcement not found");
      }
      return announcement;
    }
  },

  create: async (data: CreateAnnouncementData): Promise<Announcement> => {
    const response = await apiClient.post<AnnouncementResponse>(
      "/announcements",
      data,
    );
    return response.data;
  },

  update: async (
    id: string,
    data: UpdateAnnouncementData,
  ): Promise<Announcement> => {
    const response = await apiClient.put<AnnouncementResponse>(
      `/announcements/${id}`,
      data,
    );
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/announcements/${id}`);
  },
};
