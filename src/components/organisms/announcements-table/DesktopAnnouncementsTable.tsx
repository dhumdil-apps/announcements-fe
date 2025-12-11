import { flexRender } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import type { useAnnouncementsTable } from "./useAnnouncementsTable";

interface DesktopAnnouncementsTableProps {
  table: ReturnType<typeof useAnnouncementsTable>["table"];
  isEmpty: boolean;
  isFilteredEmpty: boolean;
}

export function DesktopAnnouncementsTable({
  table,
  isEmpty,
  isFilteredEmpty,
}: DesktopAnnouncementsTableProps) {
  if (isEmpty) {
    return (
      <div className="text-muted-foreground hidden py-12 text-center lg:block">
        No announcements yet
      </div>
    );
  }

  if (isFilteredEmpty) {
    return (
      <div className="text-muted-foreground hidden py-12 text-center lg:block">
        No announcements match your filters
      </div>
    );
  }

  return (
    <div className="border-border bg-card hidden overflow-x-auto rounded-lg border lg:block">
      <table className="divide-border min-w-full divide-y">
        <thead className="bg-muted">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={cn(
                    "p-4 text-left text-xs font-bold tracking-wider text-black uppercase",
                  )}
                >
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-border bg-card divide-y">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-muted/50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
