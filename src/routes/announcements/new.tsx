import { createFileRoute } from "@tanstack/react-router";
import { EditAnnouncementForm } from "../../components/EditAnnouncementForm";
import { categoriesApi } from "../../api/categories";

export const Route = createFileRoute("/announcements/new")({
  loader: async () => {
    const categories = await categoriesApi.getAll();
    return { categories };
  },
  component: NewAnnouncementPage,
});

function NewAnnouncementPage() {
  const { categories } = Route.useLoaderData();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New Announcement</h1>
      <div className="max-w-2xl rounded-lg bg-white p-6 shadow">
        <EditAnnouncementForm categories={categories} />
      </div>
    </div>
  );
}
