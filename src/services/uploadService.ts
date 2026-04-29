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

        const booksText: UploadResult[] = [];

        for (const file of files) {
            let fullText = '';

            if (file.mimetype == 'application/pdf') {
                const parser = new PDFParse({ url: file.path });
                const result = await parser.getText();
                fullText = result.text;
                parser.destroy();
            }
            else if (file.mimetype == 'application/epub') {
                const epub = new EPub(file.path);
                await epub.parse();

                // Combine all chapters
                for (const chapter of epub.flow) {
                    const chapterText = await epub.getChapter(chapter.id);
                    fullText += chapterText + '\n\n';
                }
            }

            booksText.push({
                filename: file.originalname,
                content: fullText,
            });

            // Delete temp file
            fs.unlink(file.path, (err) => {
                if (err) console.error(`Error deleting ${file.path}:`, err);
            });
        }
        return booksText;
    }
}