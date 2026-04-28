import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../utils/errors";


export class UploadController {
    private static instance: UploadController;

    async upLoadBook(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.files);
            if(!req.files) throw new ValidationError("No file uploaded");
            res.json({ success: true, message: "Upload book successfully", data: req.file });
        } catch (error) {
            next(error);
        }
    }
}