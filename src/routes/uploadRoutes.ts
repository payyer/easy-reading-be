import { Router } from "express";
import { upload } from "../middleware/uploadMiddleware";
import { asyncHandler } from "../middleware/errorHandler";
import { UploadController } from "../controllers/uploadController";

const router = Router();
const controller = new UploadController();
router.post("/books",upload.array('books'), asyncHandler((req, res, next) => controller.upLoadBook(req, res, next)));

export default router;