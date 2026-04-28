import { Router } from 'express';
import healthCheckRoutes from './healthCheckRoutes';
import uploadRoutes from './uploadRoutes'
const router = Router();

router.use('/health-check', healthCheckRoutes);
router.use('/upload', uploadRoutes)

export default router;
