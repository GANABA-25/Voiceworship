"use client";

import { ArrowBigLeft, ArrowBigRight, LogOut, Settings } from "lucide-react";

export default function SideBar() {
  return (
    <aside
      className={`fixed top-0 left-0 z-50 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 shadow-sm transition-all duration-300 hidden lg:flex flex-col h-screen `}
    >
      <div
        className={`flex h-24 items-center  border-b border-gray-200 px-4 justify-center `}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-bold">
              G
            </div>
            <h1 className="whitespace-nowrap font-bold text-white">GroupBox</h1>
          </>
        </div>

        <button className="flex items-center justify-center rounded-md transition-colors text-white hover:text-primary cursor-pointer">
          <ArrowBigRight size={15} />
        </button>
      </div>

      {/* <nav className="p-4">
        <SideBarNav />
      </nav> */}

      <div className="space-y-4 mt-auto p-4">
        <div className="flex items-center gap-3 text-white bg-primary/10 p-4 rounded-md shadow-sm">
          <Settings size={15} />
          <h1>Settings</h1>
        </div>

        {/* <Button onClick={logout}>
          <LogOut />
          Log Out
        </Button> */}
      </div>
    </aside>
  );
}
