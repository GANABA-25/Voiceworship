"use client";
import SideBar from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden">
      <SideBar />
      <main className={`h-screen overflow-y-auto transition-all duration-300`}>
        <div className="mx-2 min-w-0 md:mx-4 mt-24">{children}</div>
      </main>
    </div>
  );
}
