import Select from "react-select";
import type { Category } from "@/data/types";
import { Input, TextArea } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import type { useAnnouncementForm } from "./useAnnouncementForm";
import { DATE_REGEX } from "@/lib/dateUtils";

interface AnnouncementFormFieldsProps {
  form: ReturnType<typeof useAnnouncementForm>["form"];
  categories: Category[];
}

export function AnnouncementFormFields({
  form,
  categories,
}: AnnouncementFormFieldsProps) {
  return (
    <>
      <form.Field
        name="title"
        validators={{
          onSubmit: ({ value }) =>
            !value.trim() ? "Title is required" : undefined,
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          return (
            <FormField label="Title" htmlFor={field.name} error={error}>
              <Input
                id={field.name}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                variant={error ? "error" : "default"}
              />
            </FormField>
          );
        }}
      </form.Field>

      <form.Field
        name="content"
        validators={{
          onSubmit: ({ value }) =>
            !value.trim() ? "Content is required" : undefined,
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          return (
            <FormField label="Content" htmlFor={field.name} error={error}>
              <TextArea
                id={field.name}
                rows={5}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                variant={error ? "error" : "default"}
              />
            </FormField>
          );
        }}
      </form.Field>

      <form.Field
        name="categories"
        validators={{
          onSubmit: ({ value }) =>
            value.length === 0
              ? "At least one category is required"
              : undefined,
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          return (
            <FormField
              label="Categories"
              description="Select category so readers know what your announcement is about."
              error={error}
            >
              <Select
                isMulti
                options={categories}
                value={categories.filter((c) =>
                  field.state.value.includes(c.value),
                )}
                onChange={(selected) =>
                  field.handleChange(selected.map((s) => s.value))
                }
                classNames={{
                  control: () =>
                    error
                      ? "!border-destructive !shadow-sm"
                      : "!border-input !shadow-sm",
                }}
                components={{
                  IndicatorSeparator: () => null,
                  ClearIndicator: () => null,
                }}
              />
            </FormField>
          );
        }}
      </form.Field>

      <form.Field
        name="publicationDate"
        validators={{
          onSubmit: ({ value }) => {
            if (!value.trim()) return "Publication date is required";
            if (!DATE_REGEX.test(value))
              return "Publication date must be in format MM/DD/YYYY HH:mm";
            return undefined;
          },
        }}
      >
        {(field) => {
          const error = field.state.meta.errors[0];
          return (
            <FormField
              label="Publication date"
              htmlFor={field.name}
              error={error}
            >
              <Input
                id={field.name}
                type="text"
                placeholder="MM/DD/YYYY HH:mm"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                variant={error ? "error" : "default"}
              />
            </FormField>
          );
        }}
      </form.Field>
    </>
  );
}
