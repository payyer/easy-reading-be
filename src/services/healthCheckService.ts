import { ApiResponse } from "../types";

export class HealthCheckService {
  async check(): Promise<ApiResponse<{ status: string }>> {
    return {
      success: true,
      data: { status: 'OK' },
      message: 'Server is running',
    };
  }
}
