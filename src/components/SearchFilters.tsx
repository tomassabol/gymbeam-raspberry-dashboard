import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useDebouncedCallback } from "use-debounce";
import type { Device } from "@/types/types";

export function SearchFilters({
  defaultDevices,
}: {
  defaultDevices: Device[];
}) {
  const [deviceId, setDeviceId] = useState<string>("");
  const [deviceIp, setDeviceIp] = useState<string>("");
  const [scannerId, setScannerId] = useState<string>("");

  const resetFilters = () => {
    setDeviceId("");
    setDeviceIp("");
    setScannerId("");
    // change the target value of the actual input element
    (document.getElementById("device_id") as HTMLInputElement).value = "";
    (document.getElementById("device_ip") as HTMLInputElement).value = "";
    (document.getElementById("scanner_id") as HTMLInputElement).value = "";
  };

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
      console.log("filtered", Array.from(devicesSet));
    },
    300
  );

  return (
    <form
      className="flex md:flex-row flex-col gap-2"
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
        id="device_id"
        placeholder="Device ID"
        onChange={(e) => {
          setDeviceId(e.target.value.trim());
          onSubmit({ deviceId, deviceIp, scannerId });
        }}
      />
      <Input
        id="device_ip"
        placeholder="Device IP"
        onChange={(e) => {
          setDeviceIp(e.target.value.trim());
          onSubmit({ deviceId, deviceIp, scannerId });
        }}
      />
      <Input
        id="scanner_id"
        placeholder="Scanner ID"
        onChange={(e) => {
          setScannerId(e.target.value.trim());
          onSubmit({ deviceId, deviceIp, scannerId });
        }}
      />
      <Button type="submit">Search</Button>
      <Button type="button" variant="outline" onClick={() => resetFilters()}>
        Reset
      </Button>
    </form>
  );
}
