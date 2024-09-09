import { SearchFilters } from "./components/SearchFilters";
import { DeviceTable } from "./components/DeviceTable";
import { useState } from "react";
import type { Device } from "./types/types";
import useWebSocket from "react-use-websocket";
import { DeviceTableLoader } from "./components/loaders/DeviceTableLoader";
import { UpdateAlertContainer } from "./components/UpdateAlertContainer";

const SOCKET_URL = import.meta.env.VITE_WS_URL!;

export default function App() {
  const [devices, setDevices] = useState<Device[]>([]);

  const [updatedAt, setUpdatedAt] = useState<Date | undefined>(undefined);
  const [isLive, setIsLive] = useState(true);

  const { sendJsonMessage, readyState } = useWebSocket(SOCKET_URL, {
    share: true,
    shouldReconnect: () => false,
    onOpen: () =>
      sendJsonMessage({
        action: "ping",
        ...(devices.length !== 0 && { data: "gui" }),
      }),
    onMessage: (event) => {
      if (!isLive) return;
      const fetchedDevice = JSON.parse(event.data) as Device;
      setDevices((prevDevices) => {
        const deviceExists = prevDevices.some(
          (device) => device.device_id === fetchedDevice.device_id
        );
        if (deviceExists) {
          return prevDevices.map((device) => {
            if (device.device_id === fetchedDevice.device_id) {
              return fetchedDevice;
            }
            return device;
          });
        }
        setUpdatedAt(new Date());
        return [...prevDevices, fetchedDevice];
      });
    },
    filter: () => {
      if (isLive) return true;
      else return false;
    },
  });

  // @ts-expect-error - readyStateString is not defined
  const readyStateString = {
    0: "CONNECTING",
    1: "OPEN",
    2: "CLOSING",
    3: "CLOSED",
  }[readyState];

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
      {devices.length > 0 && <SearchFilters defaultDevices={devices} />}

      <DeviceTableComponent devices={devices} state={readyStateString} />
    </main>
  );
}

function DeviceTableComponent({
  devices,
}: {
  devices: Device[];
  state: string | undefined;
}) {
  return devices.length > 0 ? (
    <DeviceTable devices={devices} />
  ) : (
    <DeviceTableLoader />
  );
}
