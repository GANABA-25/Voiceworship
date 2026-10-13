type voiceWaveFormTypes = {
  volume: number;
};

export default function VoiceWaveform({ volume }: voiceWaveFormTypes) {
  return (
    <div className="flex justify-center h-10 items-center gap-0.75">
      {Array.from({ length: 55 }).map((_, index) => {
        const distance = Math.abs(index - 15.5);
        const strength = Math.max(0.2, 1 - distance / 18);
        const idleHeights = [
          4, 7, 5, 11, 6, 15, 8, 12, 5, 9, 6, 14, 7, 11, 8, 16, 9, 13, 6, 10, 7,
          15, 5, 11, 8, 14, 6, 9, 5, 12, 7, 10, 15, 5, 11, 8, 14, 6, 9, 5, 12,
          7, 10, 15, 5, 11, 8, 14, 6, 9, 5, 12, 7, 10, 4,
        ];

        const idleHeight = idleHeights[index];
        const activeHeight = Math.max(4, volume * strength);
        const height = volume > 10 ? Math.min(activeHeight, 28) : idleHeight;

        return (
          <span
            key={index}
            className={`w-0.75 rounded-full transition-all duration-100 ${
              volume > 10 ? "bg-primary" : "bg-primary/40"
            }`}
            style={{
              height: `${height}px`,
            }}
          />
        );
      })}
    </div>
  );
}
