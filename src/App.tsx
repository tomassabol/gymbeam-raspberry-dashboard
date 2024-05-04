import { SearchFilters } from "./components/SearchFilters";
import { DeviceTable } from "./components/DeviceTable";
import { useEffect, useState } from "react";
import type { Device } from "./types/types";
import { useDeviceStore } from "./stores/useDeviceStore";
import useWebSocket from "react-use-websocket";
import { DeviceTableLoader } from "./components/loaders/DeviceTableLoader";

const SOCKET_URL =
  "wss://a8podsjqza.execute-api.eu-central-1.amazonaws.com/production";

export default function App() {
  const devicesStore = useDeviceStore();
  const [devices, setDevices] = useState<Device[]>(devicesStore.devices);

  const { sendJsonMessage, readyState } = useWebSocket(SOCKET_URL, {
    share: true,
    shouldReconnect: () => false,
    onOpen: () => sendJsonMessage({ action: "ping", data: "gui" }),
    onMessage: (event) => {
      const fetchedDevices = JSON.parse(event.data) as Device[];
      if (!Array.isArray(fetchedDevices)) {
        // console.log("Device", fetchedDevices);
        updateDevice(fetchedDevices);
        return;
      }
      upsertDevices(fetchedDevices);
      return;
    },
  });

  // @ts-expect-error - readyStateString is not defined
  const readyStateString = {
    0: "CONNECTING",
    1: "OPEN",
    2: "CLOSING",
    3: "CLOSED",
  }[readyState];

  function upsertDevices(devices: Device[]) {
    const devicesSet = Array.from(new Set(devices));
    devicesStore.setDevices(devicesSet);
    setDevices(devicesSet);
  }

  function updateDevice(updatedDevice: Device) {
    const newDevices = devices.map((device) => {
      if (device.device_id === updatedDevice.device_id) return updatedDevice;
      return device;
    });
    devicesStore.setDevices(newDevices);
    setDevices(newDevices);
  }

  useEffect(() => {
    setDevices(devicesStore.devices);
  }, [devicesStore.devices]);

  return (
    <main className="p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">GymBeam - Raspberry dashboard</h1>
      {devices.length > 0 && <SearchFilters defaultDevices={devices} />}
      <p className="text-sm">Number of devices: {devices.length}</p>

      {readyStateString === "OPEN" && devices.length > 0 ? (
        <DeviceTable devices={devices} />
      ) : (
        <DeviceTableLoader />
      )}
    </main>
  );
}
