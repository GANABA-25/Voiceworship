import { MicAudioLines } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-1 overflow-hidden">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary font-bold text-white">
        <MicAudioLines size={15} />
      </div>

      <h1 className="whitespace-nowrap font-bold text-text">
        Voice<span className="text-primary">Worship</span>
      </h1>
    </div>
  );
}
