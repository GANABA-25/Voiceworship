export default function PresentationCard() {
  return (
    <div className="flex justify-center items-center border border-border rounded-md shadow-xs">
      <div className="space-y-4 text-center p-4 bg-card">
        <h1 className="font-black tracking-wider text-primary">Genesis 1:2</h1>

        <p className="text-xs leading-5 tracking-wide text-text">
          And the earth was without form, and void and darkness was upon the
          face of the deep.
        </p>
      </div>
    </div>
  );
}
