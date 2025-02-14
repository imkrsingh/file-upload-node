import { Schema, Document, model } from "mongoose";

// Define the structure of the file document
interface IFile extends Document {
    filename: string;
    path: string;
    size: number;
    mimeType: string;
}

const fileSchema: Schema = new Schema<IFile>(
    {
        filename: { type: String, required: true },
        path: { type: String, required: true },
        size: { type: Number, required: true },
        mimeType: { type: String, required: true }
    },
    { timestamps: true }
);

const File = model<IFile>("File", fileSchema);

export default File;
