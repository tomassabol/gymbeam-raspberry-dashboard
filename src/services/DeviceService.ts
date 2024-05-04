import type { Device } from "../types/types";

const socket = new WebSocket(
  "wss://a8podsjqza.execute-api.eu-central-1.amazonaws.com/production"
);

export default {
  openConnection(): Promise<Device[]> {
    return new Promise((resolve, reject) => {
      socket.send(JSON.stringify({ action: "ping", data: "gui" }));
      socket.addEventListener("message", (event) => {
        const fetchedDevices = JSON.parse(event.data) as Device[];
        if (!Array.isArray(fetchedDevices)) {
          reject("Devices are not an array");
          return;
        }
        console.log("fetchedDevices", fetchedDevices);
        resolve(fetchedDevices);
      });
      socket.addEventListener("error", (event) => {
        reject(event);
        socket.close();
      });
    });
  },

  updateDevice(): Promise<Device> {
    return new Promise((resolve, reject) => {
      socket.addEventListener("message", (event) => {
        const device = JSON.parse(event.data);

        resolve(device);
      });
      socket.addEventListener("error", (event) => {
        reject(event);
      });
      this.closeConnection();
    });
  },

  closeConnection() {
    socket.addEventListener("close", (event) => {
      console.log("connection closed");
      console.log(event);
    });
  },
};
