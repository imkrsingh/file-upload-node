import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import fileRoutes from "./routes/fileRoutes";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use("/api/files", fileRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World with TypeScript!');
});

app.get('/about', (req: Request, res: Response) => {
    res.send('Hello This is About Page<<<<.');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


