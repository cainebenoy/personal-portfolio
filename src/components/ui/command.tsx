"use client";

// shadcn-pattern Command on cmdk, in the notebook hand. cmdk owns the
// filtering, arrow-key roving, and selection state.
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/cn";

export function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn("flex w-full flex-col overflow-hidden", className)}
      {...props}
    />
  );
}

export function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div className="flex items-center gap-3 border-b border-line-faint px-4">
      <span aria-hidden="true" className="mono-tag text-red">
        ⌘K
      </span>
      <CommandPrimitive.Input
        className={cn(
          "w-full bg-transparent py-3.5 font-hand text-[0.95rem] text-ink outline-none placeholder:text-ink/50",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn("max-h-[46vh] overflow-y-auto py-2", className)}
      {...props}
    />
  );
}

export function CommandEmpty(
  props: React.ComponentProps<typeof CommandPrimitive.Empty>,
) {
  return (
    <CommandPrimitive.Empty
      className="mono-tag px-4 py-3 text-ink/55"
      {...props}
    />
  );
}

export function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        "[&_[cmdk-group-heading]]:mono-tag px-0 [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-red",
        className,
      )}
      {...props}
    />
  );
}

export function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "flex cursor-pointer items-baseline justify-between gap-6 px-4 py-2.5 font-hand text-[0.95rem] text-ink/75 data-[selected=true]:bg-raised data-[selected=true]:text-ink",
        className,
      )}
      {...props}
    />
  );
}

export function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return <span className={cn("mono-tag text-ink/50", className)} {...props} />;
}
