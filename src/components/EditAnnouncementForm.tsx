import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import Select from "react-select";
import type { Announcement } from "../data/types";
import { categories, announcements } from "../data/mockData";

interface EditAnnouncementFormProps {
  announcement: Announcement;
}

const DATE_REGEX =
  /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4} ([01]\d|2[0-3]):[0-5]\d$/;

export function EditAnnouncementForm({
  announcement,
}: EditAnnouncementFormProps) {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      title: announcement.title,
      content: announcement.content,
      categories: announcement.categories,
      publicationDate: announcement.publicationDate,
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

      // Update mock data
      const index = announcements.findIndex((a) => a.id === announcement.id);
      if (index !== -1) {
        announcements[index] = {
          ...announcements[index],
          ...value,
          lastUpdate: new Date()
            .toLocaleString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(",", ""),
        };
      }

      navigate({ to: "/announcements" });
    },
  });

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
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Publish
        </button>
        <button
          type="button"
          onClick={() => navigate({ to: "/announcements" })}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
