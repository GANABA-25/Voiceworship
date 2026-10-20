import { redirect } from "next/navigation";
import DashboardShell from "@/components/navbar/dashboard-shell";
import { getSession } from "@/lib/session"; // see below

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/auth?mode=signin");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
