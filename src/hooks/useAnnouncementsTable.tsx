import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import type { Announcement, Category } from "../data/types";

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const columnHelper = createColumnHelper<Announcement>();

interface UseAnnouncementsTableProps {
  data: Announcement[];
  categories: Category[];
}

export type SortOrder = "asc" | "desc";

export function useAnnouncementsTable({
  data,
  categories,
}: UseAnnouncementsTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.publicationDate);
      const dateB = new Date(b.publicationDate);
      return sortOrder === "desc"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
  }, [data, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("publicationDate", {
        header: "Publication date",
        cell: (info) => dateTimeFormatter.format(new Date(info.getValue())),
      }),
      columnHelper.accessor("lastUpdate", {
        header: "Last Update",
        cell: (info) => dateFormatter.format(new Date(info.getValue())),
      }),
      columnHelper.accessor("categories", {
        header: "Categories",
        cell: (info) => {
          const cats = info.getValue();
          return cats
            .map((c) => categories.find((cat) => cat.value === c)?.label ?? c)
            .join(", ");
        },
        filterFn: (row, columnId, filterValue: string[]) => {
          if (!filterValue || filterValue.length === 0) return true;
          const rowCategories = row.getValue<string[]>(columnId);
          return filterValue.some((filter) => rowCategories.includes(filter));
        },
      }),
      columnHelper.display({
        id: "link",
        cell: (info) => (
          <Link
            to="/announcements/$id"
            params={{ id: info.row.original.id }}
            className="text-blue-600 hover:text-blue-800"
          >
            <Pencil className="h-5 w-5" />
          </Link>
        ),
      }),
    ];
  }, [categories]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: sortedData,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const categoryFilter = (columnFilters.find((f) => f.id === "categories")
    ?.value ?? []) as string[];

  const setCategoryFilter = (values: string[]) => {
    setColumnFilters((prev) => {
      const other = prev.filter((f) => f.id !== "categories");
      if (values.length === 0) return other;
      return [...other, { id: "categories", value: values }];
    });
  };

  const searchQuery = (columnFilters.find((f) => f.id === "title")?.value ??
    "") as string;

  const setSearchQuery = (value: string) => {
    setColumnFilters((prev) => {
      const other = prev.filter((f) => f.id !== "title");
      if (!value) return other;
      return [...other, { id: "title", value }];
    });
  };

  return {
    table,
    categoryFilter,
    setCategoryFilter,
    categories,
    sortOrder,
    toggleSortOrder,
    searchQuery,
    setSearchQuery,
  };
}
