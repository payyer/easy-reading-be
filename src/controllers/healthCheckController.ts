import { Request, Response, NextFunction } from "express";
import { HealthCheckService } from "../services/healthCheckService";

export class HealthCheckController {
  private service = new HealthCheckService();

  async healthCheck(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.service.check();
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}