import type { Announcement, Category } from "./types";

export const categories: Category[] = [
  { value: "news", label: "News" },
  { value: "events", label: "Events" },
  { value: "alerts", label: "Alerts" },
  { value: "community", label: "Community" },
  { value: "services", label: "Services" },
];

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "City Hall Holiday Hours",
    content:
      "City Hall will be closed on December 25th and January 1st. Regular hours will resume on January 2nd.",
    publicationDate: "12/15/2024 09:00",
    lastUpdate: "12/18/2024 14:30",
    categories: ["news", "services"],
  },
  {
    id: "2",
    title: "Road Maintenance on Main Street",
    content:
      "Main Street will be closed for repairs from January 5th to January 10th. Please use alternative routes.",
    publicationDate: "12/20/2024 10:00",
    lastUpdate: "12/20/2024 10:00",
    categories: ["alerts"],
  },
  {
    id: "3",
    title: "Community Clean-up Day",
    content:
      "Join us for our annual community clean-up day on January 15th at Central Park. Volunteers welcome!",
    publicationDate: "12/10/2024 08:00",
    lastUpdate: "12/22/2024 16:45",
    categories: ["events", "community"],
  },
  {
    id: "4",
    title: "New Library Opening",
    content:
      "The new downtown library branch will open on February 1st. Grand opening celebration planned.",
    publicationDate: "12/01/2024 12:00",
    lastUpdate: "12/15/2024 09:15",
    categories: ["news", "events"],
  },
];
