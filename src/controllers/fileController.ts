import { Request, Response } from "express";
import File from "../models/fileModel";

// Update the controller to handle both single and multiple files
export const uploadFile = async (req: Request, res: Response): Promise<void> => {
    // Check if no file or files are uploaded
    if (!req.file && (!req.files || (Array.isArray(req.files) && req.files.length === 0))) {
        res.status(400).json({ message: "No file uploaded" });
        return;
    }

    // Handle single file upload
    if (req.file) {
        try {
            const newFile = new File({
                filename: req.file.originalname,
                savedAs: req.file.filename,
                path: req.file.path,
                size: req.file.size,
                mimeType: req.file.mimetype,
            });

            const savedFile = await newFile.save();
            res.status(201).json(savedFile);
        } catch (err) {
            res.status(500).json({ message: "Error saving file", error: err });
        }
    }

    // Handle multiple files upload
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
        try {
            const filesData = req.files as Express.Multer.File[];

            const savedFiles = await Promise.all(filesData.map(async (file) => {
                const newFile = new File({
                    filename: file.originalname,
                    savedAs: file.filename,
                    path: file.path,
                    size: file.size,
                    mimeType: file.mimetype,
                });

                return await newFile.save();
            }));

            res.status(201).json(savedFiles);
        } catch (err) {
            res.status(500).json({ message: "Error saving files", error: err });
        }
    }
};
