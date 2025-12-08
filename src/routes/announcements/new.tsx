import { createFileRoute } from "@tanstack/react-router";
import { EditAnnouncementForm } from "../../components/EditAnnouncementForm";

export const Route = createFileRoute("/announcements/new")({
  component: NewAnnouncementPage,
});

function NewAnnouncementPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">New Announcement</h1>
      <div className="max-w-2xl rounded-lg bg-white p-6 shadow">
        <EditAnnouncementForm />
      </div>
    </div>
  );
}
