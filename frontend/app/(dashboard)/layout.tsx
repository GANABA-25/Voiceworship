"use client";

import SideBar from "@/components/navbar/sidebar";
import Header from "@/components/navbar/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="h-screen overflow-hidden">
        <SideBar />

        <main
          className={`h-screen overflow-y-auto transition-all duration-300 lg:ml-50`}
        >
          <div className="mx-2 min-w-0 md:mx-4">{children}</div>
        </main>
      </div>
    </>
  );
}
