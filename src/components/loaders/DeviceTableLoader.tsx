import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function DeviceTableLoader() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-slate-100">
            <TableHead>Device ID</TableHead>
            <TableHead>Device type</TableHead>
            <TableHead>Scanner ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>CPU usage</TableHead>
            <TableHead>Disk usage</TableHead>
            <TableHead>Core temp</TableHead>
            <TableHead>CPU freq</TableHead>
            <TableHead>Disk read time</TableHead>
            <TableHead>Disk write time</TableHead>
            <TableHead>Network sent</TableHead>
            <TableHead>Network recv</TableHead>
            <TableHead>Version</TableHead>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_) => (
              <RowLoading />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function RowLoading() {
  return (
    <TableRow>
      {Array.from({ length: 14 }).map((_) => (
        <TableCell key={crypto.randomUUID()}>
          <Skeleton className="h-6 w-24" />
        </TableCell>
      ))}
    </TableRow>
  );
}
