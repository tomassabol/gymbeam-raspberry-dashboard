import type { Device } from "@/types/types";
import { create } from "zustand";

interface DeviceStore {
  devices: Device[];
  addDevice: (device: Device) => void;
  setDevices: (devices: Device[]) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  devices: [],
  setDevices: (devices) => set({ devices }),
  addDevice: (device) =>
    set((state) => ({ devices: [...state.devices, device] })),
}));
