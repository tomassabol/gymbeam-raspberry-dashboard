import { SearchFilters } from "./components/SearchFilters";
import { DeviceTable } from "./components/DeviceTable";
import { useEffect, useState } from "react";
import type { Device } from "./types/types";
import { useDeviceStore } from "./stores/useDeviceStore";
import useWebSocket from "react-use-websocket";
import { DeviceTableLoader } from "./components/loaders/DeviceTableLoader";

const SOCKET_URL = import.meta.env.VITE_WS_URL!;

export default function App() {
  const devicesStore = useDeviceStore();
  const [defaultDevices, setDefaultDevices] = useState<Device[]>(
    devicesStore.devices
  );
  const [devices, setDevices] = useState<Device[]>(devicesStore.devices);

  const { sendJsonMessage, readyState } = useWebSocket(SOCKET_URL, {
    share: true,
    shouldReconnect: () => false,
    onOpen: () => sendJsonMessage({ action: "ping", data: "gui" }),
    onMessage: (event) => {
      const fetchedDevices = JSON.parse(event.data) as Device[];
      if (!Array.isArray(fetchedDevices)) {
        console.log("Device");
        return;
      }
      console.log("Devices");
      upsertDevices(fetchedDevices);
      return;
    },
    filter: (message) => {
      const parsedMessage = JSON.parse(message.data);
      return Array.isArray(parsedMessage);
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
    setDefaultDevices(devicesSet);
  }

  useEffect(() => {
    setDevices(devicesStore.devices);
  }, [devicesStore.devices]);

  return (
    <main className="p-8 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">GymBeam - Raspberry dashboard</h1>
      {defaultDevices.length > 0 && <SearchFilters defaultDevices={devices} />}
      <p className="text-sm">Number of devices: {devices.length}</p>

      <DeviceTableComponent devices={devices} state={readyStateString} />
    </main>
  );
}

function DeviceTableComponent({
  devices,
  state,
}: {
  devices: Device[];
  state: string | undefined;
}) {
  return state === "OPEN" && devices.length > 0 ? (
    <DeviceTable devices={devices} />
  ) : (
    <DeviceTableLoader />
  );
}
