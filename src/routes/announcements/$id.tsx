import { createFileRoute } from "@tanstack/react-router";
import { EditAnnouncementForm } from "../../components/EditAnnouncementForm";
import { announcements } from "../../data/mockData";

export const Route = createFileRoute("/announcements/$id")({
  component: EditAnnouncementPage,
});

function EditAnnouncementPage() {
  const { id } = Route.useParams();
  const announcement = announcements.find((a) => a.id === id);

  if (!announcement) {
    return <div>Announcement not found</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Edit Announcement</h1>
      <div className="max-w-2xl rounded-lg bg-white p-6 shadow">
        <EditAnnouncementForm announcement={announcement} />
      </div>
    </div>
  );
}
