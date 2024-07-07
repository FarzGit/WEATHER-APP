import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import cors from 'cors';
import userRouter from './routers/userRouter.js';
dotenv.config()

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}))




app.use('/api/users',userRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
