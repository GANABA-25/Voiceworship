"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type DialogProps = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function Dialog({
  trigger,
  title,
  description,
  children,
  footer,
  maxWidth = "450px",
  open,
  onOpenChange,
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          style={{ maxWidth }}
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card p-6 text-foreground shadow-xl outline-none"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <DialogPrimitive.Title className="text-lg font-bold">
                {title}
              </DialogPrimitive.Title>

              {description && (
                <DialogPrimitive.Description className="text-sm text-muted">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>

            <DialogPrimitive.Close
              aria-label="Close dialog"
              className="rounded-md p-1 text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
            >
              <X size={18} />
            </DialogPrimitive.Close>
          </div>

          <div className="mt-5">{children}</div>

          {footer && (
            <div className="mt-6 flex justify-end gap-3">{footer}</div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
