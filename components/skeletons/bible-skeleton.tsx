const TEXT_WIDTHS = ["w-4/5", "w-full", "w-3/5", "w-11/12", "w-2/3", "w-5/6"];

type BibleSkeletonProps = {
  count: number;
};

export default function BibleSkeleton({ count }: BibleSkeletonProps) {
  return (
    <div
      className="space-y-4 animate-pulse"
      role="status"
      aria-busy="true"
      aria-label="Loading Bible passage"
    >
      <div className="flex items-end gap-2">
        <div className="flex items-center gap-2">
          <div className="h-5 w-24 rounded bg-muted/30" />
          <div className="h-5 w-5 rounded bg-muted/30" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-8 rounded bg-muted/20" />
          <div className="h-1 w-1 rounded-full bg-muted/20" />
          <div className="h-3 w-14 rounded bg-muted/20" />
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-md border border-border bg-card p-4">
            <div className="flex justify-between items-center gap-4">
              <div className="flex w-full items-center gap-4">
                <div className="h-4 w-4 shrink-0 rounded bg-muted/30" />
                <div
                  className={`h-4 rounded bg-muted/20 ${TEXT_WIDTHS[i % TEXT_WIDTHS.length]}`}
                />
              </div>

              <div className="flex items-center justify-end gap-4">
                <div className="h-4 w-4 shrink-0 rounded bg-muted/30" />
                <div className="h-4 w-4 shrink-0 rounded bg-muted/30" />
                <div className="h-4 w-4 shrink-0 rounded bg-muted/30" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
