import { createRootRoute, Outlet } from "@tanstack/react-router";
import { RootLayout } from "@/components/templates/RootLayout";
import type { LinkProps } from "@tanstack/react-router";
import { Megaphone } from "lucide-react";

export type NavigationItem = {
  path: LinkProps["to"];
  label: string;
  icon: React.ReactNode;
};

const navigation: NavigationItem[] = [
  {
    path: "/announcements",
    label: "Announcements",
    icon: <Megaphone className="h-5 w-5 shrink-0" />,
  },
];

export const Route = createRootRoute({
  component: () => (
    <RootLayout title="Test City" navigation={navigation}>
      <Outlet />
    </RootLayout>
  ),
});
