import { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
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

  const table = useReactTable({
    data: sortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
  };
}
