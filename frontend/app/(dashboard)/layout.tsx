"use client";

import SideBar from "@/components/navbar/sidebar";
import Header from "@/components/navbar/header";
import PresentationOutputPanel from "@/components/PresentationOutputPanel/presentation-output-panel";
import PresentationQueue from "@/components/PresentationQueue/presentation-queue";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-hidden">
      <Header />

      <SideBar />

      <div className="flex h-[calc(100vh-4rem)] pt-16 lg:ml-51">
        <main className="min-w-0 flex-1 overflow-y-auto scrollbar-yellow">
          <div className="mx-auto w-full">{children}</div>
        </main>

        <aside className="hidden w-100 shrink-0 overflow-y-auto border-l border-border bg-background p-4 scrollbar-yellow xl:block">
          <PresentationOutputPanel />
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-card shadow-lg p-4 backdrop-blur-md lg:left-51 xl:right-100">
        <PresentationQueue />
      </div>
    </div>
  );
}
