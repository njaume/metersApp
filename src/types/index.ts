export interface IMeter {
  id: string;
  api_name: string;
  display_name: string;
  active: boolean;
  used_for_billing: boolean;
  type: "sum" | "max" | "unique_count";
  updated_time: string;
  created_time: string;
}

export type IMeterBody = Omit<IMeter, "id" | "updated_time" | "created_time">;

export interface IApiService {
  getMeters(): Promise<IMeter[]>;
  createMeter(meter: IMeterBody): Promise<unknown>;
  updateMeter(meterId: string, meter: IMeterBody): Promise<unknown>;
  deleteMeter(meterId: string): Promise<unknown>;
}