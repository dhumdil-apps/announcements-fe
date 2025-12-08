import { createFileRoute } from "@tanstack/react-router";
import { EditAnnouncementForm } from "../../components/EditAnnouncementForm";
import { announcementsApi } from "../../api/announcements";
import { categoriesApi } from "../../api/categories";

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
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Announcement</h1>
      <div className="max-w-2xl rounded-lg bg-white p-6 shadow">
        <EditAnnouncementForm
          announcement={announcement}
          categories={categories}
        />
      </div>
    </div>
  );
}
