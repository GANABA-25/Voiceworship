import Link from "next/link";

import { MicAudioLines } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1 overflow-hidden">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary font-bold text-white">
        <MicAudioLines size={15} />
      </div>

      <h1 className="whitespace-nowrap font-black text-text text-2xl">
        Voice<span className="text-primary">Worship</span>
      </h1>
    </Link>
  );
}
