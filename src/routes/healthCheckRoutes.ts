import { Router } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { HealthCheckController } from '../controllers/healthCheckController';

const router = Router();
const controller = new HealthCheckController();

// GET /api/health-check - Health check endpoint
router.get('/', asyncHandler((req, res, next) => controller.healthCheck(req, res, next)));

export default router;