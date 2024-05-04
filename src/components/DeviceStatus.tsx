import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";

export function DeviceStatus({ status }: { status: boolean }) {
  return (
    <Badge
      variant={"outline"}
      className={cn(
        "flex gap-0.5 w-fit",
        status ? "border-green-400" : "border-red-300"
      )}
    >
      <span
        className={cn(
          "font-bold text-lg",
          status ? "text-green-600" : "text-red-600"
        )}
      >
        •
      </span>
      <span>{status ? "Active" : "Offline"}</span>
    </Badge>
  );
}
