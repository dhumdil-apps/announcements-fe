import type { Announcement, Category } from "@/data/types";
import { ConfirmModal } from "@/components/molecules";
import { useAnnouncementForm } from "./useAnnouncementForm";
import { AnnouncementFormFields } from "./AnnouncementFormFields";
import { AnnouncementFormActions } from "./AnnouncementFormActions";

interface AnnouncementEditProps {
  announcement?: Announcement;
  categories: Category[];
}

export function AnnouncementEdit({
  announcement,
  categories,
}: AnnouncementEditProps) {
  const { form, isEditing, handleRemove, handleCancel, confirmModalProps } =
    useAnnouncementForm({ announcement });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <AnnouncementFormFields form={form} categories={categories} />

        <form.Subscribe selector={(state) => state.canSubmit}>
          {(canSubmit) => (
            <AnnouncementFormActions
              isEditing={isEditing}
              isSubmitDisabled={!canSubmit}
              onRemove={handleRemove}
              onCancel={handleCancel}
            />
          )}
        </form.Subscribe>

        <ConfirmModal
          isOpen={confirmModalProps.isOpen}
          title={confirmModalProps.title}
          message={confirmModalProps.message}
          onConfirm={confirmModalProps.onConfirm}
          onCancel={confirmModalProps.onCancel}
        />
      </form>
    </>
  );
}
