import fs from "fs";
import EPub from "epub";
import { PDFParse } from 'pdf-parse';
import { TextResult } from "pdf-parse";
import { ValidationError } from "../utils/errors";
type UploadResult = {
    filename: string;
    content: TextResult | string;
}

export class UploadService {
    async uploadBook(files: Express.Multer.File[]): Promise<UploadResult[]> {
        if (!files || files.length === 0) throw new ValidationError("No file uploaded");

        const booksContent: UploadResult[] = [];

        // parse PDF files
        for (const file of files) {
            if (file.mimetype == 'application/pdf') {
                const parser = new PDFParse({ url: file.path });
                const result = await parser.getText();
                booksContent.push({
                    filename: file.originalname,
                    content: result,
                });

                parser.destroy(); // Clean up resources after parsing
            } else {
                // parse EPUB files
                const epub = new EPub(file.path);
                await epub.parse();
                for (const chapter of epub.flow) {
                    const text = await epub.getChapter(chapter.id);
                    booksContent.push({
                        filename: file.originalname,
                        content: text,
                    });
                }
            }

            // Delete the uploaded file after processing
            fs.unlink(file.path, (err) => {
                if (err) console.error(`Error deleting file ${file.path}:`, err);
            });
        }
        return booksContent;
    }
}