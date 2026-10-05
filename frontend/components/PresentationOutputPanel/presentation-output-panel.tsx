// "use client";

// import Button2 from "../ui/button-2";

// import LiveOutput from "./live-output";
// import PreviewOutput from "./preview-output";

// import {
//   Play,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   Eraser,
//   MonitorX,
//   Airplay,
// } from "lucide-react";

// export default function PresentationOutputPanel() {
//   return (
//     <section className="flex-2 min-h-0 space-y-4 overflow-y-auto scrollbar-yellow">
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <p className="text-xs text-muted">Live output</p>
//           <p className="text-xs text-muted">1920 × 1080</p>
//         </div>
//         <LiveOutput />
//       </div>

//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <p className="text-xs text-muted">Preview / Next</p>

//           <button
//             type="button"
//             className="text-xs text-muted transition-colors hover:text-primary"
//           >
//             Clear
//           </button>
//         </div>
//         <PreviewOutput />
//       </div>

//       <button
//         type="button"
//         className="flex w-full items-center justify-center gap-2 rounded-md bg-primary p-4 text-xs font-bold text-background shadow-xs transition-all duration-200 hover:bg-primary-light hover:shadow-sm active:scale-[0.98]"
//       >
//         <Play size={15} fill="currentColor" />
//         Go live
//       </button>

//       <div className="grid grid-cols-3 gap-2">
//         <Button2 icon={<Eye size={15} />} label="Preview" />
//         <Button2 icon={<ChevronLeft size={15} />} label="Prev" />
//         <Button2 icon={<ChevronRight size={15} />} label="Next" />
//         <Button2 icon={<Eraser size={15} />} label="Clear" />
//         <Button2 icon={<MonitorX size={15} />} label="Block" />
//         <Button2 icon={<Airplay size={15} />} label="On Air" />
//       </div>
//     </section>
//   );
// }

"use client";

import Button2 from "../ui/button-2";

import LiveOutput from "./live-output";
import PreviewOutput from "./preview-output";

import {
  Play,
  Eye,
  ChevronLeft,
  ChevronRight,
  Eraser,
  MonitorX,
  Airplay,
} from "lucide-react";

import { usePresentation } from "@/store/presentation-context";

export default function PresentationOutputPanel() {
  const {
    goLivePreview,
    clearPreview,
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
          <p className="text-xs text-muted">Live output</p>
          <p className="text-xs text-muted">1920 × 1080</p>
        </div>

        <LiveOutput />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted">Preview / Next</p>

          <button
            type="button"
            onClick={clearPreview}
            className="text-xs text-muted transition-colors hover:text-primary"
          >
            Clear
          </button>
        </div>

        <PreviewOutput />
      </div>

      <button
        type="button"
        onClick={goLivePreview}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary p-4 text-xs font-bold text-background shadow-xs transition-all duration-200 hover:bg-primary-light hover:shadow-sm active:scale-[0.98]"
      >
        <Play size={15} fill="currentColor" />
        Go live
      </button>

      <div className="grid grid-cols-3 gap-2">
        <Button2 icon={<Eye size={15} />} label="Preview" />

        <Button2
          icon={<ChevronLeft size={15} />}
          label="Prev"
          onClick={previousSlide}
        />

        <Button2
          icon={<ChevronRight size={15} />}
          label="Next"
          onClick={nextSlide}
        />

        <Button2
          icon={<Eraser size={15} />}
          label="Clear"
          onClick={clearPreview}
        />

        <Button2
          icon={<MonitorX size={15} />}
          label={isBlocked ? "Unblock" : "Block"}
          onClick={toggleBlock}
        />

        <Button2
          icon={<Airplay size={15} />}
          label={isOnAir ? "On Air" : "Off Air"}
          onClick={toggleOnAir}
        />
      </div>
    </section>
  );
}
