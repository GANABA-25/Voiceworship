export default function PresentationCard() {
  return (
    <div className="relative h-50 overflow-hidden rounded-md border border-border  to-background p-8 text-center shadow-xs">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,190,71,0.12),transparent_45%)]" />
      <div className="space-y-4 text-center">
        <h1 className="font-black tracking-wider text-primary">Genesis 1:2</h1>

        <p className="text-sm leading-5 tracking-wide text-text">
          And the earth was without form, and void and darkness was upon the
          face of the deep.
        </p>
      </div>
    </div>
  );
}
