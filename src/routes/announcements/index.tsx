import { createFileRoute } from "@tanstack/react-router";
import { announcementsApi } from "@/api/announcements";
import { categoriesApi } from "@/api/categories";
import { AnnouncementsList } from "@/components/templates";

export const Route = createFileRoute("/announcements/")({
  loader: async () => {
    const [announcements, categories] = await Promise.all([
      announcementsApi.getAll(),
      categoriesApi.getAll(),
    ]);
    return { announcements, categories };
  },
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const { announcements, categories } = Route.useLoaderData();

  return (
    <AnnouncementsList
      title="Announcements"
      announcements={announcements}
      categories={categories}
    />
  );
}
