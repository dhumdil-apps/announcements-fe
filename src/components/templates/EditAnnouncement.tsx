import type { Announcement, Category } from "@/data/types";
import { AnnouncementEdit } from "@/components/organisms";

export function EditAnnouncement({
  title,
  announcement,
  categories,
}: {
  title: string;
  announcement?: Announcement;
  categories: Category[];
}) {
  return (
    <div className="min-h-vh flex w-full justify-center">
      <div className="w-full max-w-2xl">
        <h1 className="p-6 text-2xl font-bold">{title}</h1>

        <div className="rounded-lg bg-white p-6 shadow">
          <AnnouncementEdit
            announcement={announcement}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
}
