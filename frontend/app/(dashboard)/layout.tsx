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

      <div className="flex h-[calc(100vh-4rem)] min-h-0 pt-16 lg:ml-60">
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto scrollbar-yellow pb-45">
          <div className="mx-auto w-full">{children}</div>
        </main>

        <aside className="hidden min-h-0 w-110 shrink-0 overflow-y-auto border-l border-border bg-background p-4 scrollbar-yellow xl:block">
          <PresentationOutputPanel />
        </aside>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 h-60 overflow-hidden border-t border-border bg-card p-4 shadow-lg backdrop-blur-md lg:left-60 xl:right-110">
        <PresentationQueue />
      </div>
    </div>
  );
}
