import { createFileRoute } from "@tanstack/react-router";
import { categoriesApi } from "@/api/categories";
import { EditAnnouncement } from "@/components/templates";

export const Route = createFileRoute("/announcements/new")({
  loader: async () => {
    const categories = await categoriesApi.getAll();
    return { categories };
  },
  component: NewAnnouncementPage,
});

function NewAnnouncementPage() {
  const { categories } = Route.useLoaderData();

  return <EditAnnouncement title="New Announcement" categories={categories} />;
}
