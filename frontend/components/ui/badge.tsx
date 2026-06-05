import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 font-mono text-xs font-medium",
        variant === "default" && "bg-surface text-muted",
        variant === "accent" && "bg-accent/10 text-accent",
        variant === "outline" && "border border-border text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
