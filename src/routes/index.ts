import { Router } from 'express';
import healthCheckRoutes from './healthCheckRoutes';

const router = Router();

router.use('/health-check', healthCheckRoutes);

export default router;
