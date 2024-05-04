import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import { useDeviceStore } from "@/stores/useDeviceStore";
import type { Device } from "@/types/types";

export function SearchFilters({
  defaultDevices,
}: {
  defaultDevices: Device[];
}) {
  const deviceStore = useDeviceStore();
  const [devices] = useState<Device[]>(defaultDevices);

  const [deviceId, setDeviceId] = useState<string>("");
  const [deviceIp, setDeviceIp] = useState<string>("");
  const [scannerId, setScannerId] = useState<string>("");

  const onSubmit = useDebouncedCallback(
    ({
      deviceId,
      deviceIp,
      scannerId,
    }: {
      deviceId: string;
      deviceIp: string;
      scannerId: string;
    }) => {
      console.log("Searching devices", { deviceId, deviceIp, scannerId });

      // call this only if the the deviceId is not empty string
      const filteredDevices = [];
      if (deviceId === "" && deviceIp === "" && scannerId === "") {
        console.log("defaultDevices", devices);
        deviceStore.setDevices(devices);
        return;
      }
      if (deviceId !== "") {
        filteredDevices.push(
          ...defaultDevices.filter((device) =>
            device?.device_id?.toString()?.includes(deviceId)
          )
        );
      }
      if (deviceIp !== "") {
        filteredDevices.push(
          ...defaultDevices.filter((device) => device?.ip?.includes(deviceIp))
        );
      }
      if (scannerId !== "") {
        filteredDevices.push(
          ...defaultDevices.filter((device) =>
            device.scanner_id?.toString()?.includes(scannerId)
          )
        );
      }

      const devicesSet = new Set(filteredDevices);
      deviceStore.setDevices(Array.from(devicesSet));
      console.log("filtered", Array.from(devicesSet));
    },
    300
  );

  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          deviceId,
          deviceIp,
          scannerId,
        });
      }}
    >
      <Input
        placeholder="Device ID"
        onChange={(e) => {
          setDeviceId(e.target.value.trim());
          onSubmit({ deviceId, deviceIp, scannerId });
        }}
      />
      <Input
        placeholder="Device IP"
        onChange={(e) => {
          setDeviceIp(e.target.value.trim());
          onSubmit({ deviceId, deviceIp, scannerId });
        }}
      />
      <Input
        placeholder="Scanner ID"
        onChange={(e) => {
          setScannerId(e.target.value.trim());
          onSubmit({ deviceId, deviceIp, scannerId });
        }}
      />
      <Button type="submit">Search</Button>
      <Button
        type="button"
        variant="outline"
        onClick={() => onSubmit({ deviceId: "", deviceIp: "", scannerId: "" })}
      >
        Reset
      </Button>
    </form>
  );
}
