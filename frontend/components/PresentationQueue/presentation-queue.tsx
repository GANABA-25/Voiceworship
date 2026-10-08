"use client";

import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import PresentationQueueCard from "@/components/PresentationQueue/presentation-queue-card";
import { usePresentation } from "@/store/presentation-context";
import EmptyState from "../empty-state";
import Button2 from "../ui/button-2";

import { Plus } from "lucide-react";

export default function PresentationQueue() {
  const { queue } = usePresentation();
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  if (queue.length === 0) {
    return (
      <EmptyState
        image="/illustrations/Queue.svg"
        alt="Bible"
        title="Build your presentation queue"
        description="Select content from your library or search for a Bible passage to add your first item to the queue."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-medium uppercase text-muted">
          Presentation Queue
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted">8 items</span>

          <div className="flex gap-2">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-border p-1 px-4 text-text shadow-xs transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-hover hover:shadow-sm active:translate-y-0 active:scale-95 active:shadow-none"
            >
              Prev
            </button>

            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-border p-1 px-4 text-text shadow-xs transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-hover hover:shadow-sm active:translate-y-0 active:scale-95 active:shadow-none"
            >
              Next
            </button>

            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-border p-1 px-4 text-text shadow-xs transition-all duration-150 ease-out hover:-translate-y-0.5 hover:bg-hover hover:shadow-sm active:translate-y-0 active:scale-95 active:shadow-none"
            >
              <Plus size={15} />
              Add slide
            </button>
          </div>
        </div>
      </div>

      <div className="slider-container">
        <Slider ref={sliderRef} {...settings}>
          {queue.map((item) => (
            <div key={item.id} className="pr-2">
              <PresentationQueueCard data={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
