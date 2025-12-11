import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { announcementsApi } from "@/api/announcements";
import { categoriesApi } from "@/api/categories";
import { AnnouncementsList } from "@/components/templates";

interface SearchParams {
  category?: string[];
  search?: string;
}

export const Route = createFileRoute("/announcements/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    const result: SearchParams = {};

    const category = search.category;
    if (Array.isArray(category)) {
      result.category = category.filter((c) => typeof c === "string");
    } else if (typeof category === "string") {
      result.category = [category];
    }

    if (typeof search.search === "string" && search.search.trim()) {
      result.search = search.search.trim();
    }

    return result;
  },
  loaderDeps: ({ search }) => ({
    category: search.category,
    search: search.search,
  }),
  loader: async ({ deps }) => {
    const [announcements, categories] = await Promise.all([
      announcementsApi.getAll({
        categories: deps.category,
        search: deps.search,
      }),
      categoriesApi.getAll(),
    ]);
    return {
      announcements,
      categories,
      selectedCategories: deps.category,
      searchQuery: deps.search,
    };
  },
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const { announcements, categories, selectedCategories, searchQuery } =
    Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate();

  const handleCategoryChange = (values: string[]) => {
    navigate({
      to: "/announcements",
      search: {
        ...search,
        category: values.length > 0 ? values : undefined,
      },
    });
  };

  const handleSearchChange = (value: string) => {
    navigate({
      to: "/announcements",
      search: {
        ...search,
        search: value || undefined,
      },
    });
  };

  return (
    <AnnouncementsList
      announcements={announcements}
      categories={categories}
      selectedCategories={selectedCategories ?? []}
      onCategoryChange={handleCategoryChange}
      searchQuery={searchQuery ?? ""}
      onSearchChange={handleSearchChange}
    />
  );
}
