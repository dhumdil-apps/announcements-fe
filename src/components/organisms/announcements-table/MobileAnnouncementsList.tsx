import { flexRender } from "@tanstack/react-table";
import type { useAnnouncementsTable } from "./useAnnouncementsTable";
import { cn } from "@/lib/utils";

interface MobileAnnouncementsListProps {
  table: ReturnType<typeof useAnnouncementsTable>["table"];
  isEmpty: boolean;
  isFilteredEmpty: boolean;
}

export function MobileAnnouncementsList({
  table,
  isEmpty,
  isFilteredEmpty,
}: MobileAnnouncementsListProps) {
  if (isEmpty) {
    return (
      <div className="text-muted-foreground py-12 text-center lg:hidden">
        No announcements yet
      </div>
    );
  }

  if (isFilteredEmpty) {
    return (
      <div className="text-muted-foreground py-12 text-center lg:hidden">
        No announcements match your filters
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:hidden">
      {table.getRowModel().rows.map((row) => (
        <div
          key={row.id}
          className="border-border bg-card rounded-lg border p-4"
        >
          {row.getVisibleCells().map((cell) => {
            const header = cell.column.columnDef.header;
            const headerText = typeof header === "string" ? header : "";

            return (
              <div
                key={cell.id}
                className="border-border flex items-start justify-between gap-4 border-b py-2 last:border-b-0"
              >
                {headerText && (
                  <span className="text-muted-foreground shrink-0 text-sm font-medium">
                    {headerText}
                  </span>
                )}

                <span
                  className={cn(
                    "text-foreground text-right text-sm",
                    !headerText && "w-full items-center justify-end",
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
