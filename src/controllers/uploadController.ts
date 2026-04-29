import { ValidationError } from "../utils/errors";
import { NextFunction, Request, Response } from "express";
import { UploadService } from "../services/uploadService";

export class UploadController {
    private uploadService = new UploadService();
    async upLoadBook(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.files, "files");
            if (!req.files || !Array.isArray(req.files)) throw new ValidationError("No file uploaded or invalid format");
            const data = await this.uploadService.uploadBook(req.files);
            res.json({
                success: true,
                message: "Upload book successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    }
}
