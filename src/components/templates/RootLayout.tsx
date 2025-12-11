import { MobileHeader, DesktopSidebar } from "@/components/organisms";
import { useAnnouncementEvents } from "@/hooks";
import type { NavigationItem } from "@/routes/__root";

export function RootLayout({
  title,
  navigation,
  children,
}: {
  title: string;
  navigation: NavigationItem[];
  children: React.ReactNode;
}) {
  useAnnouncementEvents();

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <MobileHeader title={title} navigation={navigation} />
      <DesktopSidebar title={title} navigation={navigation} />

      <main className="bg-background min-w-0 flex-1 overflow-x-hidden p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}
