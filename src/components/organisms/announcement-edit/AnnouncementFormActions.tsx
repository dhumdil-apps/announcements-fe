import { Button } from "@/components/atoms";

interface AnnouncementFormActionsProps {
  isEditing: boolean;
  isSubmitDisabled: boolean;
  onRemove: () => void;
  onCancel: () => void;
}

export function AnnouncementFormActions({
  isEditing,
  isSubmitDisabled,
  onRemove,
  onCancel,
}: AnnouncementFormActionsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {isEditing && (
        <div className="[&>button]:w-full sm:[&>button]:w-auto">
          <Button type="button" variant="destructive" onClick={onRemove}>
            Remove
          </Button>
        </div>
      )}

      <div className="sm:ml-auto [&>button]:w-full sm:[&>button]:w-auto">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <div className="[&>button]:w-full sm:[&>button]:w-auto">
        <Button type="submit" disabled={isSubmitDisabled}>
          Publish
        </Button>
      </div>
    </div>
  );
}
