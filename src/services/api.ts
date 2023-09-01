import axios, { AxiosInstance } from "axios";
import config from "../config";
import { IMeter, IMeterBody } from "../types";

class ApiService {
  api: AxiosInstance;
  private static singleton: ApiService;
  private authToken: string;
  constructor() {
    this.api = axios.create({
      baseURL: config.serverDomain,
    });
    this.authToken = config.authToken;
  }

  static getInstance(): ApiService {
    if (this.singleton) {
      return this.singleton;
    } else {
      this.singleton = new ApiService();
      return this.singleton;
    }
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  withAuthHeaders() {
    return {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "API-KEY": this.authToken,
      },
    };
  }

  async getMeters(): Promise<IMeter[]> {
    const response = await this.api.get("/meters", this.withAuthHeaders());
    return response?.data;
  }

  async createMeter(meter: IMeterBody) {
    const response = await this.api.post(
      `/meters`,
      meter,
      this.withAuthHeaders()
    );
    return response;
  }

  async updateMeter(meterId: string, meter: IMeterBody) {
    const response = await this.api.put(
      `/meters/${meterId}`,
      meter,
      this.withAuthHeaders()
    );
    return response;
  }

  async deleteMeter(meterId: string) {
    const response = await this.api.delete(
      `/meters/${meterId}`,
      this.withAuthHeaders()
    );
    return response;
  }
}

export default ApiService.getInstance();
