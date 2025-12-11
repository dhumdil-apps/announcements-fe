import { Link } from "@/components/atoms";
import { AlertBanner } from "@/components/molecules";
import type { NavigationItem } from "@/routes/__root";
import { Building2 } from "lucide-react";

export function DesktopSidebar({
  title,
  navigation,
}: {
  title: string;
  navigation: NavigationItem[];
}) {
  return (
    <aside className="bg-sidebar sticky top-0 hidden h-screen w-72 flex-col border-r border-gray-200 text-gray-800 lg:flex">
      <div className="flex items-center gap-3 border-b border-gray-200 p-4">
        <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded text-xl font-bold text-black">
          <Building2 className="h-5 w-5 shrink-0" />
        </div>
        <span className="text-lg font-semibold">{title}</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navigation.map((item) => (
          <Link key={item.path as string} to={item.path}>
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}

        <AlertBanner label="Offline - using mock data" variant="desktop" />
      </nav>
    </aside>
  );
}
