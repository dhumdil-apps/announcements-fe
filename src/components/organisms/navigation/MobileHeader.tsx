import { Link } from "@/components/atoms";
import { AlertBanner } from "@/components/molecules";
import type { NavigationItem } from "@/routes/__root";
import { Building2 } from "lucide-react";

export function MobileHeader({
  title,
  navigation,
}: {
  title: string;
  navigation: NavigationItem[];
}) {
  return (
    <header className="bg-sidebar flex items-center justify-between border-b border-gray-200 p-3 text-gray-800 lg:hidden">
      <div className="flex items-center gap-3">
        <div className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded text-xl font-bold text-black">
          <Building2 className="h-5 w-5 shrink-0" />
        </div>
        <span className="text-lg font-semibold">{title}</span>
      </div>

      <nav className="flex items-center gap-2">
        <AlertBanner variant="mobile" />
        {navigation.map((item) => (
          <Link key={item.path as string} to={item.path} title={item.label}>
            {item.icon}
          </Link>
        ))}
      </nav>
    </header>
  );
}
