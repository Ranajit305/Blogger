import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

import { connectDB } from './db/connectDB.js'

import userRouter from './routes/user.route.js'
import blogRouter from './routes/blog.route.js'
import commentRouter from './routes/comment.route.js'

const PORT = process.env.PORT;
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));

app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);
app.use('/api/comment', commentRouter);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listening to PORT: ${PORT}`);
})