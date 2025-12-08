import { useForm } from "@tanstack/react-form";
import { useNavigate, useRouter } from "@tanstack/react-router";
import Select from "react-select";
import type { Announcement, Category } from "../data/types";
import { announcementsApi } from "../api/announcements";

interface EditAnnouncementFormProps {
  announcement?: Announcement;
  categories: Category[];
}

// Convert ISO date string to display format (MM/DD/YYYY HH:mm)
function isoToDisplayDate(isoDate: string): string {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${month}/${day}/${year} ${hours}:${minutes}`;
}

// Convert display format (MM/DD/YYYY HH:mm) to ISO date string
function displayToIsoDate(displayDate: string): string {
  const match = displayDate.match(
    /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/,
  );
  if (!match) return displayDate;
  const [, month, day, year, hours, minutes] = match;
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hours),
    Number(minutes),
  ).toISOString();
}

const DATE_REGEX =
  /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4} ([01]\d|2[0-3]):[0-5]\d$/;

export function EditAnnouncementForm({
  announcement,
  categories,
}: EditAnnouncementFormProps) {
  const navigate = useNavigate();
  const router = useRouter();
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
      const errors: string[] = [];

      if (!value.title.trim()) {
        errors.push("Title is required");
      }
      if (!value.content.trim()) {
        errors.push("Content is required");
      }
      if (value.categories.length === 0) {
        errors.push("At least one category is required");
      }
      if (!value.publicationDate.trim()) {
        errors.push("Publication date is required");
      } else if (!DATE_REGEX.test(value.publicationDate)) {
        errors.push("Publication date must be in format MM/DD/YYYY HH:mm");
      }

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }

      const payload = {
        title: value.title,
        content: value.content,
        categories: value.categories,
        publicationDate: displayToIsoDate(value.publicationDate),
      };

      if (isEditing) {
        await announcementsApi.update(announcement.id, payload);
      } else {
        await announcementsApi.create(payload);
      }

      await router.invalidate();
      navigate({ to: "/announcements" });
    },
  });

  const handleRemove = async () => {
    if (!announcement) return;
    if (!confirm("Are you sure you want to remove this announcement?")) return;

    await announcementsApi.delete(announcement.id);
    await router.invalidate();
    navigate({ to: "/announcements" });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6"
    >
      <form.Field name="title">
        {(field) => (
          <div>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id={field.name}
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="content">
        {(field) => (
          <div>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id={field.name}
              rows={5}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        )}
      </form.Field>

      <form.Field name="categories">
        {(field) => (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categories
            </label>
            <Select
              isMulti
              options={categories}
              value={categories.filter((c) =>
                field.state.value.includes(c.value),
              )}
              onChange={(selected) =>
                field.handleChange(selected.map((s) => s.value))
              }
              className="mt-1"
              classNames={{
                control: () => "!border-gray-300 !shadow-sm",
              }}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="publicationDate">
        {(field) => (
          <div>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              Publication date
            </label>
            <input
              id={field.name}
              type="text"
              placeholder="MM/DD/YYYY HH:mm"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        )}
      </form.Field>

      <div className="flex gap-4">
        {isEditing && (
          <button
            type="button"
            onClick={handleRemove}
            className="cursor-pointer rounded-md bg-white px-4 py-2 text-gray-700 transition-all duration-200 hover:bg-red-500 hover:text-white focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
          >
            Remove
          </button>
        )}

        <button
          type="button"
          onClick={() => navigate({ to: "/announcements" })}
          className="ml-auto cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-yellow-400 px-4 py-2 font-bold text-black hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:outline-none"
        >
          Publish
        </button>
      </div>
    </form>
  );
}
