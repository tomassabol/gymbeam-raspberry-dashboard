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
import CopyToClipboard from "./util/CopyToClipboard";
import NullOrUndefined from "./util/NullOrUndefined";

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
                  colSpan={14}
                  className="text-center h-32 text-muted-foreground"
                >
                  No devices found
                </TableCell>
              </TableRow>
            )}
            {devices.map((device) => (
              <TableRow key={crypto.randomUUID()}>
                <TableCell className="font-semibold">
                  <CopyToClipboard text={device.device_id}>
                    {device.device_id}
                  </CopyToClipboard>
                </TableCell>
                <TableCell>
                  <CopyToClipboard text={device.device_type}>
                    {device.device_type}
                  </CopyToClipboard>
                </TableCell>
                <TableCell>
                  {device.scanner_id ? (
                    <CopyToClipboard text={device.scanner_id.toString()}>
                      {device.scanner_id}
                    </CopyToClipboard>
                  ) : (
                    <NullOrUndefined />
                  )}
                </TableCell>
                <TableCell>
                  {device.alive === undefined ? (
                    <NullOrUndefined />
                  ) : (
                    <DeviceStatus status={device.alive} />
                  )}
                </TableCell>
                <TableCell>
                  {device.ip?.split(" ").map((ip) => (
                    <CopyToClipboard key={crypto.randomUUID()} text={ip}>
                      {ip}
                    </CopyToClipboard>
                  )) ?? <NullOrUndefined />}
                </TableCell>
                <TableCell>{device.cpu_usage ?? <NullOrUndefined />}</TableCell>
                <TableCell>
                  {device.disk_usage ?? <NullOrUndefined />}
                </TableCell>
                <TableCell>{device.core_temp ?? <NullOrUndefined />}</TableCell>
                <TableCell>{device.cpu_freq ?? <NullOrUndefined />}</TableCell>
                <TableCell>
                  {device.disk_read_time ?? <NullOrUndefined />}
                </TableCell>
                <TableCell>
                  {device.disk_write_time ?? <NullOrUndefined />}
                </TableCell>
                <TableCell>
                  {device.network_sent ?? <NullOrUndefined />}
                </TableCell>
                <TableCell>
                  {device.network_recv ?? <NullOrUndefined />}
                </TableCell>
                <TableCell>{device.version ?? <NullOrUndefined />}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
