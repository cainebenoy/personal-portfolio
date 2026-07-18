"use client";

// shadcn-pattern Tabs on Radix — arrow-key roving and aria wiring for
// free — styled as notebook tab labels with a red underline for the
// active drawer.
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/cn";

export const Tabs = TabsPrimitive.Root;

export function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        "flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-3",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "mono-tag relative cursor-pointer py-1.5 text-ink/60 transition-colors duration-300 hover:text-ink data-[state=active]:text-red",
        "after:absolute after:right-0 after:-bottom-[13px] after:left-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-red/70 after:transition-transform after:duration-300 after:ease-out-expo after:content-[''] data-[state=active]:after:scale-x-100",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content className={cn("outline-none", className)} {...props} />
  );
}
