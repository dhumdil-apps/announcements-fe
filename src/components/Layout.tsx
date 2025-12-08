import { Link } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-16 flex-col bg-gray-800 text-white xl:w-64">
        <div className="flex items-center justify-center gap-3 border-b border-gray-700 p-4 xl:justify-start">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-blue-500 text-xl font-bold">
            T
          </div>
          <span className="hidden text-lg font-semibold xl:block">
            Test City
          </span>
        </div>
        <nav className="flex-1 p-2 xl:p-4">
          <Link
            to="/announcements"
            className="flex items-center justify-center gap-3 rounded px-2 py-2 hover:bg-gray-700 xl:justify-start xl:px-4 [&.active]:bg-gray-700"
          >
            <Megaphone className="h-5 w-5 shrink-0" />
            <span className="hidden xl:block">Announcements</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 p-4 xl:p-8">{children}</main>
    </div>
  );
}
