import type { Device } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { DeviceStatus } from "./DeviceStatus";

export function DeviceTable({ devices }: { devices: Device[] }) {
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
            {devices.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center h-32 text-muted-foreground"
                >
                  No devices found
                </TableCell>
              </TableRow>
            )}
            {devices.map((device) => (
              <TableRow key={crypto.randomUUID()}>
                <TableCell className="font-semibold">
                  {device.device_id}
                </TableCell>
                <TableCell>{device.device_type}</TableCell>
                <TableCell>{device.scanner_id}</TableCell>
                <TableCell>
                  <DeviceStatus status={device.alive} />
                </TableCell>
                <TableCell>{device.ip}</TableCell>
                <TableCell>{device.cpu_usage}</TableCell>
                <TableCell>{device.disk_usage}</TableCell>
                <TableCell>{device.core_temp}</TableCell>
                <TableCell>{device.cpu_freq}</TableCell>
                <TableCell>{device.disk_read_time}</TableCell>
                <TableCell>{device.disk_write_time}</TableCell>
                <TableCell>{device.network_sent}</TableCell>
                <TableCell>{device.network_recv}</TableCell>
                <TableCell>{device.version}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
