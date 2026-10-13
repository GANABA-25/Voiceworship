"use client";

import ProgressBar from "@/components/progress-bar";
import { useState } from "react";
import SelectInput from "@/components/select-input";

export default function page() {
  const [translation, setTranslation] = useState("kjv");
  const [autoProject, setAutoProject] = useState(true);
  return (
    <div>
      <header className="flex items-center justify-between border-b border-border bg-card p-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-black">Service Dashboard</h1>

          <p className="text-sm text-muted">
            Sunday Worship · 10:30 AM · Main Auditorium
          </p>
        </div>
      </header>

      <main className="p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-border rounded-md">
            <h1 className="p-4 text-muted">Presentation Control</h1>

            <div className="flex justify-between items-center border-t border-border p-4">
              <h1>Automatically project recognized passages</h1>

              <button
                type="button"
                role="switch"
                aria-checked={autoProject}
                onClick={() => setAutoProject((previous) => !previous)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                  autoProject ? "bg-primary" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    autoProject ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-between items-center border-t border-border p-4">
              <h1>Confirm before going live</h1>

              <button
                type="button"
                role="switch"
                aria-checked={autoProject}
                onClick={() => setAutoProject((previous) => !previous)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
                  autoProject ? "bg-primary" : "bg-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    autoProject ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex justify-between items-center border-t border-border p-4">
              <h1>Default media volume</h1>

              <ProgressBar progress={15} />
            </div>
          </div>

          <div className="border border-border rounded-md">
            <h1 className="p-4 text-muted">Voice Recognition</h1>

            <div className="flex justify-between items-center border-t border-border p-4">
              <h1>Microphone</h1>

              <SelectInput
                name="TRANSLATION"
                label="Version"
                value={translation}
                options={[{ value: "Booth-Mic" }, { value: "Pulpit Mic" }]}
                onChange={setTranslation}
              />
            </div>

            <div className="flex justify-between items-center border-t border-border p-4">
              <h1>Auto-project above confidence</h1>

              <SelectInput
                name="TRANSLATION"
                label="Version"
                value={translation}
                options={[
                  { value: "80%" },
                  { value: "90%" },
                  { value: "Never" },
                ]}
                onChange={setTranslation}
              />
            </div>

            <div className="flex justify-between items-center border-t border-border p-4">
              <h1>Default Bible version</h1>

              <SelectInput
                name="TRANSLATION"
                label="Version"
                value={translation}
                options={[
                  { value: "KJV" },
                  { value: "NIV" },
                  { value: "ESV" },
                  { value: "NKJ" },
                  { value: "NLT" },
                ]}
                onChange={setTranslation}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
