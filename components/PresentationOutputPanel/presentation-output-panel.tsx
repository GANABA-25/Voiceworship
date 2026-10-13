"use client";

import Button2 from "../ui/button-2";
import LiveOutput from "./live-output";
import PreviewOutput from "./preview-output";

import {
  Play,
  ChevronLeft,
  ChevronRight,
  Eraser,
  MonitorX,
  Airplay,
} from "lucide-react";

import { usePresentation } from "@/store/presentation-context";
import Button from "../ui/button";

export default function PresentationOutputPanel() {
  const {
    goLivePreview,
    clearPreview,
    clearLive,
    previousSlide,
    nextSlide,
    toggleBlock,
    toggleOnAir,
    isBlocked,
    isOnAir,
  } = usePresentation();

  return (
    <section className="flex-2 min-h-0 space-y-4 overflow-y-auto scrollbar-yellow">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-muted">Live output</p>
          <p className="text-sm text-muted">1920 × 1080</p>
        </div>

        <LiveOutput />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-muted">Preview / Next</p>

          <button
            type="button"
            onClick={clearPreview}
            className="text-sm text-muted transition-colors hover:text-primary"
          >
            Clear
          </button>
        </div>

        <PreviewOutput />
      </div>

      <Button
        onClick={goLivePreview}
        icon={<Play size={15} fill="currentColor" />}
        label="Go live"
      />

      <div className="grid grid-cols-3 gap-2">
        <Button2
          icon={<Eraser size={15} />}
          label="Clear"
          onClick={clearLive}
        />
        <Button2
          icon={<ChevronLeft size={15} />}
          label="Prev"
          onClick={previousSlide}
        />

        <Button2
          icon2={<ChevronRight size={15} />}
          label="Next"
          onClick={nextSlide}
        />

        {isBlocked ? (
          <Button2
            bg="bg-danger hover:bg-live text-white"
            icon={<MonitorX size={15} />}
            label="UnBlock"
            onClick={toggleBlock}
          />
        ) : (
          <Button2
            icon={<MonitorX size={15} />}
            label="Block"
            onClick={toggleBlock}
          />
        )}

        {isOnAir ? (
          <Button2
            bg="bg-danger hover:bg-live text-white"
            icon={<Airplay size={15} />}
            label="Off Air"
            onClick={toggleOnAir}
          />
        ) : (
          <Button2
            icon={<Airplay size={15} />}
            label="On Air"
            onClick={toggleOnAir}
          />
        )}
      </div>
    </section>
  );
}
