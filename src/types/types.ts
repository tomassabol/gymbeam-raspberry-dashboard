type Job = {
  "job-state": number;
  "job-id": number;
  "job-media-sheets-completed": number;
  "time-at-creation": number;
  "time-at-completed": number;
};

export type Device = {
  device_type: string;
  disk_write_time: string;
  network_sent: string;
  core_temp: string;
  disk_read_time: string;
  ip: string;
  disk_usage: string;
  jobs: Job[];
  device_id: string;
  scanner_id: number;
  cpu_usage: string;
  network_recv: string;
  cpu_freq: string;
  version: string;
  alive: boolean;
};
