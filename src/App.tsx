import { SearchFilters } from "./components/SearchFilters";
import { DeviceTable } from "./components/DeviceTable";
import { useEffect, useState } from "react";
import type { Device } from "./types/types";
import { useDeviceStore } from "./stores/useDeviceStore";
import useWebSocket from "react-use-websocket";
import { DeviceTableLoader } from "./components/loaders/DeviceTableLoader";
import { UpdateAlertContainer } from "./components/UpdateAlertContainer";

const SOCKET_URL = import.meta.env.VITE_WS_URL!;

export default function App() {
  const devicesStore = useDeviceStore();
  const [defaultDevices, setDefaultDevices] = useState<Device[]>(
    devicesStore.devices
  );
  const [devices, setDevices] = useState<Device[]>(devicesStore.devices);

  const [updatedAt, setUpdatedAt] = useState<Date | undefined>(undefined);
  const [isLive, setIsLive] = useState(false);

  const { sendJsonMessage, readyState } = useWebSocket(SOCKET_URL, {
    share: true,
    shouldReconnect: () => false,
    onOpen: () => sendJsonMessage({ action: "ping", data: "gui" }),
    onMessage: (event) => {
      const fetchedDevices = JSON.parse(event.data) as Device | Device[];
      if (!Array.isArray(fetchedDevices)) {
        if (isLive) updateDevice(fetchedDevices);
        return;
      }
      console.log("Devices");
      upsertDevices(fetchedDevices);
      return;
    },
    filter: (message) => {
      const parsedMessage = JSON.parse(message.data);
      if (isLive) return true;
      else return Array.isArray(parsedMessage);
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
    setUpdatedAt(new Date());
  }

  function updateDevice(updatedDevice: Device) {
    const newDevices = devices.map((device) => {
      if (device.device_id === updatedDevice.device_id) return updatedDevice;
      return device;
    });
    devicesStore.setDevices(newDevices);
    setDevices(newDevices);
    setUpdatedAt(new Date());
  }

  useEffect(() => {
    setDevices(devicesStore.devices);
  }, [devicesStore.devices]);

  return (
    <main className="p-8 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <h1 className="text-2xl font-bold">GymBeam - Raspberry dashboard</h1>
        {/* @ts-expect-error */}
        <UpdateAlertContainer
          setIsLive={setIsLive}
          live={isLive}
          updatedAt={updatedAt!}
        />
      </div>
      {defaultDevices.length > 0 && <SearchFilters defaultDevices={devices} />}

      <DeviceTableComponent
        defaultDevices={defaultDevices}
        devices={devices}
        state={readyStateString}
      />
    </main>
  );
}

function DeviceTableComponent({
  defaultDevices,
  devices,
}: {
  defaultDevices: Device[];
  devices: Device[];
  state: string | undefined;
}) {
  return defaultDevices.length > 0 ? (
    <DeviceTable devices={devices} />
  ) : (
    <DeviceTableLoader />
  );
}
