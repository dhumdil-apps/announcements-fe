import { io, Socket } from "socket.io-client";
import type { Announcement } from "@/data/types";

const SOCKET_URL = "ws://localhost:3000";

export interface AnnouncementCreatedEvent {
  type: "created";
  announcement: Announcement;
}

export interface AnnouncementUpdatedEvent {
  type: "updated";
  announcement: Announcement;
}

export type AnnouncementEvent =
  | AnnouncementCreatedEvent
  | AnnouncementUpdatedEvent;

type EventListener = (event: AnnouncementEvent) => void;

let socket: Socket | null = null;
const listeners = new Set<EventListener>();

export function connectSocket(): void {
  if (socket?.connected) return;

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("WebSocket connected");
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });

  socket.on("announcement:created", (announcement: Announcement) => {
    const event: AnnouncementCreatedEvent = { type: "created", announcement };
    listeners.forEach((listener) => listener(event));
  });

  socket.on("announcement:updated", (announcement: Announcement) => {
    const event: AnnouncementUpdatedEvent = { type: "updated", announcement };
    listeners.forEach((listener) => listener(event));
  });
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function subscribeToEvents(listener: EventListener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
