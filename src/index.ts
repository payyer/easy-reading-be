import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { ApiResponse } from './types';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== GLOBAL MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== ROUTES =====
// API routes
app.use('/api', apiRoutes);

// 404 handler - must be after all routes
app.use((req: Request, res: Response) => {
  const response: ApiResponse<null> = {
    success: false,
    error: `Route ${req.originalUrl} not found`,
  };
  res.status(404).json(response);
});

// ===== ERROR HANDLING MIDDLEWARE =====
// Must be last middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});