import express from 'express';
import mongoose from 'mongoose';
import OpenAI from 'openai';
import cors from 'cors';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;

export const app = express();

app.use(express.json())
app.use(cors());


import auth from './routes/auth.js';
import chat from './routes/chat.js';
import service from './routes/services.js';
import users from './routes/users.js';
import product from './routes/product.js'

app.use('/api/auth', auth); 
app.use('/api/chat', chat);
app.use('/api/service', service);
app.use('/api/product', product);
app.use('/api/user', users)

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`))

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
    process.exit(1);
});

export const openai = getOpenAI()

function getOpenAI() {
    if (process.env.OPENAI_KEY) {
        return new OpenAI({
            apiKey: process.env.OPENAI_KEY
        })// Configuration
    }
    return null
}