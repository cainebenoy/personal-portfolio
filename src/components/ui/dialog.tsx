"use client";

// shadcn-pattern Dialog on Radix primitives, dressed for the notebook:
// paper panel, hairline border, graph-paper backdrop dim. Radix supplies
// focus trapping, escape handling, and scroll locking.
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/cn";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;

export function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-ink/20 backdrop-blur-[2px] dark:bg-ground/60" />
      <DialogPrimitive.Content
        className={cn(
          "deal-in fixed top-[16vh] left-1/2 z-[75] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 border border-line bg-lifted shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)] outline-none",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
