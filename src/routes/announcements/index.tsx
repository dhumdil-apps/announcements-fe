import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
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
      <Link
        to="/announcements/new"
        className="fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400 text-black shadow-lg transition-colors hover:bg-yellow-300"
        aria-label="New Announcement"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </div>
  );
}
