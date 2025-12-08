import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementsTable } from "../../components/AnnouncementsTable";
import { announcements, categories } from "../../data/mockData";

export const Route = createFileRoute("/announcements/")({
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Announcements</h1>
      <AnnouncementsTable data={announcements} categories={categories} />
    </div>
  );
}
