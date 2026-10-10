"use client";

import { useEffect, useState } from "react";
import { MessageCircleCheck } from "lucide-react";

type ServiceOrderCardProps = {
  id: number;
  startTime: string;
  title: string;
  description: string;
  name: string;
  duration: string;
};

function convertToMinutes(time: string): number | null {
  const match = time
    .trim()
    .toUpperCase()
    .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/);

  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3];

  if (minutes > 59) return null;

  if (period) {
    if (hours < 1 || hours > 12) return null;
    hours = (hours % 12) + (period === "PM" ? 12 : 0);
  } else if (hours > 23) {
    return null;
  }

  return hours * 60 + minutes;
}

export default function ServiceOrderCard({
  id,
  startTime,
  title,
  description,
  name,
  duration,
}: ServiceOrderCardProps) {
  const [currentTime, setCurrentTime] = useState<number | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.getHours() * 60 + now.getMinutes());
    };

    updateTime();

    const interval = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const startMinutes = convertToMinutes(startTime);
  const durationMinutes = Number(duration);

  const endMinutes =
    startMinutes !== null &&
    Number.isFinite(durationMinutes) &&
    durationMinutes > 0
      ? startMinutes + durationMinutes
      : null;

  const isActive =
    currentTime !== null &&
    startMinutes !== null &&
    endMinutes !== null &&
    currentTime >= startMinutes &&
    currentTime < endMinutes;

  const formattedTime =
    startMinutes === null
      ? startTime
      : new Date(
          2000,
          0,
          1,
          Math.floor(startMinutes / 60),
          startMinutes % 60,
        ).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

  return (
    <div
      className={`flex items-center justify-between rounded-md border p-2 transition-colors duration-300 ${
        isActive ? "border-primary/30 bg-primary/10" : "border-border"
      }`}
    >
      <div className="flex items-center gap-8">
        <p
          className={`text-xs ${
            isActive ? "font-semibold text-primary" : "text-muted"
          }`}
        >
          {formattedTime}
        </p>

        <div className="flex items-center gap-4">
          {isActive ? (
            <div
              className="relative flex h-5 w-5 shrink-0 items-center justify-center"
              aria-label="Currently active service"
            >
              <span className="absolute h-full w-full animate-ping rounded-full bg-danger/30" />
              <span className="relative h-3 w-3 rounded-full bg-danger ring-2 ring-danger/20" />
            </div>
          ) : (
            <MessageCircleCheck size={15} className="shrink-0 text-muted" />
          )}

          <div>
            <h2
              className={`text-sm font-medium ${
                isActive ? "text-primary" : ""
              }`}
            >
              {id}. {title}
            </h2>

            <p
              className={`text-sm ${isActive ? "text-primary" : "text-muted"}`}
            >
              {description} · {name}
            </p>
          </div>
        </div>
      </div>

      <p
        className={`shrink-0 text-xs ${
          isActive ? "font-semibold text-primary" : "text-muted"
        }`}
      >
        {duration} min
      </p>
    </div>
  );
}
