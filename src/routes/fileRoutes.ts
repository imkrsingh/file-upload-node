import express from "express";
import multer from "multer";
import fs from "fs";
import { uploadFile } from "../controllers/fileController";

const uploadsFiles = () => {
    const folderPath = "uploads";
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        uploadsFiles();
        cb(null, "uploads/"); // Files will be saved in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        // Generate a unique file name by appending a timestamp to the original file name
        const uniqueName = Date.now() + "-" + file.originalname;  // Add a timestamp to avoid overwriting files
        cb(null, uniqueName); // Save the file with the timestamp and original extension
    }
});

const upload = multer({ storage });

// Create the express router
const router = express.Router();

// POST route for single file upload
router.post("/single", upload.single("file"), uploadFile);

// POST route for multiple files upload
router.post("/multiple", upload.array("files", 10), uploadFile); // 10 is the max number of files you allow

export default router;
