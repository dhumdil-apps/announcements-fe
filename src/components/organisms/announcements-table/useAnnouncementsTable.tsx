import { useMemo, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import type { Announcement, Category } from "@/data/types";
import { Badge } from "@/components/atoms";
import { Link } from "@/components/atoms";

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const columnHelper = createColumnHelper<Announcement>();

interface UseAnnouncementsTableProps {
  data: Announcement[];
  categories: Category[];
}

export function useAnnouncementsTable({
  data,
  categories,
}: UseAnnouncementsTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.lastUpdate);
      const dateB = new Date(b.lastUpdate);
      return dateB.getTime() - dateA.getTime();
    });
  }, [data]);

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("publicationDate", {
        header: "Publication date",
        cell: (info) => {
          const publicationDate = new Date(info.getValue());
          const formattedDate = dateTimeFormatter.format(publicationDate);

          return <span className="text-sm">{formattedDate}</span>;
        },
      }),
      columnHelper.accessor("lastUpdate", {
        header: "Last Update",
        cell: (info) => {
          const lastUpdate = new Date(info.getValue());
          const formattedDate = dateTimeFormatter.format(lastUpdate);

          return <span className="text-sm">{formattedDate}</span>;
        },
      }),
      columnHelper.accessor("categories", {
        header: "Categories",
        cell: (info) => {
          const cats = info.getValue();
          return (
            <div className="flex flex-wrap gap-1">
              {cats.map((c) => (
                <Badge key={c}>
                  {categories.find((cat) => cat.value === c)?.label ?? c}
                </Badge>
              ))}
            </div>
          );
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
            variant="circle"
          >
            <div className="flex w-full justify-end">
              <Pencil className="h-5 w-5" />
            </div>
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
    searchQuery,
    setSearchQuery,
  };
}
