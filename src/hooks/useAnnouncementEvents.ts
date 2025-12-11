import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import {
  connectSocket,
  subscribeToEvents,
  type AnnouncementEvent,
} from "@/api/socket";

export function useAnnouncementEvents() {
  const router = useRouter();

  useEffect(() => {
    // Request notification permission on mount
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    connectSocket();

    const unsubscribe = subscribeToEvents((event: AnnouncementEvent) => {
      showNotification(event);

      // Invalidate router cache to refresh data
      router.invalidate();
    });

    return () => {
      unsubscribe();
    };
  }, [router]);
}

function showNotification(event: AnnouncementEvent): void {
  const { title, body } = getNotificationContent(event);

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/favicon.ico",
    });
  }
}

function getNotificationContent(event: AnnouncementEvent): {
  title: string;
  body: string;
} {
  switch (event.type) {
    case "created":
      return {
        title: event.announcement.title,
        body: event.announcement.content,
      };
    case "updated":
      return {
        title: event.announcement.title,
        body: event.announcement.content,
      };
  }
}
