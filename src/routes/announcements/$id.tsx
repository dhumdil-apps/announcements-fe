import { createFileRoute } from "@tanstack/react-router";
import { announcementsApi } from "@/api/announcements";
import { categoriesApi } from "@/api/categories";
import { EditAnnouncement } from "@/components/templates";

export const Route = createFileRoute("/announcements/$id")({
  loader: async ({ params }) => {
    const [announcement, categories] = await Promise.all([
      announcementsApi.getById(params.id),
      categoriesApi.getAll(),
    ]);
    return { announcement, categories };
  },
  component: EditAnnouncementPage,
});

function EditAnnouncementPage() {
  const { announcement, categories } = Route.useLoaderData();

  return (
    <EditAnnouncement
      title="Edit the Announcement"
      announcement={announcement}
      categories={categories}
    />
  );
}
