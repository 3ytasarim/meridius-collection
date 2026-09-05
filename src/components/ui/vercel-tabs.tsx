import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

export const VercelTabs = TabsPrimitive.Root;
export const VercelTabsContent = TabsPrimitive.Content;

export function VercelTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn("inline-flex items-center gap-1 border-b border-border", className)}
      {...props}
    />
  );
}

export function VercelTabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "relative px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-primary after:transition-transform data-[state=active]:text-foreground data-[state=active]:after:scale-x-100",
        className,
      )}
      {...props}
    />
  );
}