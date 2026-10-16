"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqData } from "@/data/landingPage";

export default function FaqAccordion() {
  return (
    <Accordion
      type="multiple"
      className="flex flex-col gap-4"
      defaultValue={["notifications"]}
    >
      {faqData.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.value}
          className="group overflow-hidden border-y border-border px-5 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_8px_25px_-15px_color-mix(in_srgb,var(--primary)_35%,transparent)] data-[state=open]:border-primary/50"
        >
          <AccordionTrigger className="cursor-pointer items-center gap-4 py-5 text-left text-base font-semibold text-text transition-colors duration-200 hover:text-primary [&>svg]:text-muted [&>svg]:transition-transform [&>svg]:duration-300">
            <span>{item.trigger}</span>
          </AccordionTrigger>

          <AccordionContent className="text-base text-muted">
            <ul className="space-y-0">
              {item.features?.map((feature, index) => (
                <li
                  key={index}
                  className="transition-colors duration-200 hover:text-text"
                >
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
