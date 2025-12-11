import { useForm } from "@tanstack/react-form";
import { useNavigate, useRouter } from "@tanstack/react-router";
import type { Announcement } from "@/data/types";
import { announcementsApi } from "@/api/announcements";
import { useConfirm, useNotifications } from "@/hooks";
import { isoToDisplayDate, displayToIsoDate } from "@/lib/dateUtils";

interface UseAnnouncementFormProps {
  announcement?: Announcement;
}

export function useAnnouncementForm({
  announcement,
}: UseAnnouncementFormProps) {
  const navigate = useNavigate();
  const router = useRouter();
  const { confirm, confirmModalProps } = useConfirm();
  const { notifications, notify, dismissNotification } = useNotifications();
  const isEditing = !!announcement;

  const form = useForm({
    defaultValues: {
      title: announcement?.title ?? "",
      content: announcement?.content ?? "",
      categories: announcement?.categories ?? [],
      publicationDate: announcement?.publicationDate
        ? isoToDisplayDate(announcement.publicationDate)
        : "",
    },
    onSubmit: async ({ value }) => {
      const payload = {
        title: value.title,
        content: value.content,
        categories: value.categories,
        publicationDate: displayToIsoDate(value.publicationDate),
      };

      try {
        if (isEditing) {
          await announcementsApi.update(announcement.id, payload);
        } else {
          await announcementsApi.create(payload);
        }

        await router.invalidate();

        navigate({ to: "/announcements" });
      } catch (e) {
        notify.error("Failed to save.", "Server is offline", e);
      }
    },
  });

  const handleRemove = async () => {
    if (!announcement) return;

    const confirmed = await confirm({
      title: "Remove Announcement",
      message:
        "Are you sure you want to remove this announcement? This action cannot be undone.",
    });

    if (!confirmed) return;

    try {
      await announcementsApi.delete(announcement.id);
      await router.invalidate();
      navigate({ to: "/announcements" });
    } catch (e) {
      notify.error("Failed to remove.", "Server is offline", e);
    }
  };

  const handleCancel = () => {
    navigate({ to: "/announcements" });
  };

  return {
    form,
    isEditing,
    handleRemove,
    handleCancel,
    confirmModalProps,
    notifications,
    dismissNotification,
  };
}
