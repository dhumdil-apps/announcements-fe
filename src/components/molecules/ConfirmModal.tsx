import { useEffect, useRef } from "react";
import { Button } from "@/components/atoms";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onCancel();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onCancel]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onCancel();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="bg-card text-card-foreground open:animate-in open:fade-in-0 open:zoom-in-95 m-auto max-w-md rounded-lg p-0 shadow-xl backdrop:bg-black/50"
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-muted-foreground mt-2 text-sm">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>

          <Button type="button" variant="destructive" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </dialog>
  );
}
