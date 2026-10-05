import { usePresentation } from "@/store/presentation-context";

export default function LiveOutput() {
  const { liveSlide, isOnAir, isBlocked } = usePresentation();
  return (
    <div className="relative min-h-40 overflow-hidden rounded-md border border-border bg-linear-to-br from-[#171717] via-[#0d0d0d] to-black p-8 text-center shadow-xs">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,190,71,0.12),transparent_45%)]" />

      <div className="relative flex min-h-24 flex-col items-center justify-center">
        {isBlocked ? (
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Output blocked
          </p>
        ) : !isOnAir ? (
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Output offline
          </p>
        ) : liveSlide ? (
          <>
            <h1 className="font-black tracking-wider text-primary">
              {liveSlide.reference || liveSlide.title}
            </h1>

            <p className="mt-2 leading-6 tracking-wide text-white">
              {liveSlide.content}
            </p>
          </>
        ) : (
          <p className="text-xs text-muted">No live presentation</p>
        )}
      </div>
    </div>
  );
}
