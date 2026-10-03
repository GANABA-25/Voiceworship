"use client";

type ProgressBarProps = {
  progress?: number;
};

export default function ProgressBar({ progress = 0 }: ProgressBarProps) {
  const value = Math.min(100, Math.max(0, progress));

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted">Reference confidence</p>
        <p className="font-bold">92%</p>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary transition-all duration-150"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}
