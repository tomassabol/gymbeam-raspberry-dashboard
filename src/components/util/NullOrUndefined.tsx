import { cn } from "@/lib/utils";
import React from "react";

export default function NullOrUndefined({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn("text-muted-foreground font-normal italic p-0", className)}
    >
      {children ?? "Unknown"}
    </p>
  );
}
