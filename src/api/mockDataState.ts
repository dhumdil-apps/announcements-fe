import type { Announcement } from "@/data/types";
import { announcements as initialMockAnnouncements } from "@/data/mockData";

type Listener = (usingMock: boolean) => void;

let usingMockData = false;
const listeners = new Set<Listener>();

// Mutable copy of mock announcements for offline CRUD operations
let mockAnnouncements: Announcement[] = [...initialMockAnnouncements];
let nextId = Math.max(...mockAnnouncements.map((a) => parseInt(a.id))) + 1;

export function isUsingMockData(): boolean {
  return usingMockData;
}

export function setUsingMockData(value: boolean): void {
  if (usingMockData !== value) {
    usingMockData = value;
    listeners.forEach((listener) => listener(value));
  }
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getMockAnnouncements(): Announcement[] {
  return mockAnnouncements;
}

export function getMockAnnouncementById(id: string): Announcement | undefined {
  return mockAnnouncements.find((a) => a.id === id);
}

export function createMockAnnouncement(
  data: Omit<Announcement, "id" | "lastUpdate">,
): Announcement {
  const announcement: Announcement = {
    ...data,
    id: String(nextId++),
    lastUpdate: new Date().toISOString(),
  };
  mockAnnouncements = [...mockAnnouncements, announcement];
  return announcement;
}

export function updateMockAnnouncement(
  id: string,
  data: Partial<Omit<Announcement, "id">>,
): Announcement {
  const index = mockAnnouncements.findIndex((a) => a.id === id);
  if (index === -1) {
    throw new Error("Announcement not found");
  }
  const updated: Announcement = {
    ...mockAnnouncements[index],
    ...data,
    lastUpdate: new Date().toISOString(),
  };
  mockAnnouncements = [
    ...mockAnnouncements.slice(0, index),
    updated,
    ...mockAnnouncements.slice(index + 1),
  ];
  return updated;
}

export function deleteMockAnnouncement(id: string): void {
  mockAnnouncements = mockAnnouncements.filter((a) => a.id !== id);
}

export function resetMockData(): void {
  mockAnnouncements = [...initialMockAnnouncements];
  nextId = Math.max(...mockAnnouncements.map((a) => parseInt(a.id))) + 1;
}
