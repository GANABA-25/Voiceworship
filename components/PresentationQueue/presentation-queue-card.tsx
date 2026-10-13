import { X } from "lucide-react";
import { PresentationSlide } from "@/types/presentation";
import { usePresentation } from "@/store/presentation-context";

type QueueDataType = {
  data: PresentationSlide;
};

export default function PresentationQueueCard({ data }: QueueDataType) {
  const { removeFromQueue } = usePresentation();
  return (
    <div className="group relative flex h-40 w-full cursor-pointer flex-col overflow-hidden rounded-md border border-border bg-card shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md">
      <button
        onClick={() => removeFromQueue(data.id)}
        type="button"
        className="absolute right-2 top-2 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-black/60 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:bg-danger hover:text-white group-hover:opacity-100"
      >
        <X size={13} />
      </button>

      <div className="flex h-25 items-center justify-center bg-black p-4">
        <p className="line-clamp-3 text-center text-xs font-medium leading-5 tracking-wide text-white">
          {data.content}
        </p>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-1 border-t border-border bg-card px-3">
        <p className="truncate text-xs font-semibold text-text">{data.title}</p>

        <p className="truncate text-xs text-muted">
          {data.type === "bible"
            ? String(data.metadata?.translation ?? "")
            : data.type}
        </p>
      </div>
    </div>
  );
}
