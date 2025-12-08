import { flexRender } from "@tanstack/react-table";
import type { Announcement, Category } from "../data/types";
import { useAnnouncementsTable } from "../hooks/useAnnouncementsTable";
import { AnnouncementsFilters } from "./AnnouncementsFilters";

interface AnnouncementsTableProps {
  data: Announcement[];
  categories: Category[];
}

export function AnnouncementsTable({
  data,
  categories,
}: AnnouncementsTableProps) {
  const {
    table,
    categoryFilter,
    setCategoryFilter,
    sortOrder,
    toggleSortOrder,
    searchQuery,
    setSearchQuery,
  } = useAnnouncementsTable({
    data,
    categories,
  });

  return (
    <div className="space-y-4">
      <AnnouncementsFilters
        categories={categories}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {/* Mobile card layout */}
      <div className="space-y-4 overflow-x-auto xl:hidden">
        {table.getRowModel().rows.map((row) => (
          <div
            key={row.id}
            className="min-w-56 rounded-lg border border-gray-200 bg-white p-4"
          >
            {row.getVisibleCells().map((cell) => {
              const header = cell.column.columnDef.header;
              const headerText =
                typeof header === "string" ? header : cell.column.id;

              return (
                <div
                  key={cell.id}
                  className="flex items-center justify-between gap-8 border-b border-gray-100 py-2 last:border-b-0"
                >
                  <span className="text-sm font-medium text-gray-500">
                    {headerText}
                  </span>
                  <span className="text-right text-sm text-gray-900">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Desktop table layout */}
      <div className="hidden overflow-x-auto rounded-lg border border-gray-200 bg-white xl:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
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
          <tbody className="divide-y divide-gray-200 bg-white">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
