import { redirect } from "next/navigation";
import DashboardShell from "@/components/navbar/dashboard-shell";
import { getSession } from "@/lib/session";
import { getSubscriptionAccess } from "@/lib/server/subscription";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth?mode=signin");
  }

  const { hasAccess } = await getSubscriptionAccess(session.id);

  if (!hasAccess) {
    redirect("/pricing");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
