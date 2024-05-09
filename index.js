import express from 'express';
import mongoose from 'mongoose';
import OpenAI from 'openai';
import cors from 'cors';
//import methodOverride from 'method-override';

export const app = express();

const PORT = 3001;
const MONGO_URL = 'mongodb+srv://2118622:gf2XbVViOGni6a8v@dbw.hebeym4.mongodb.net/test-proj';


//app.use(methodOverride('_method'));
app.use(express.json()) // "body-parser"
app.use(cors());
import auth from './routes/auth.js';
import chat from './routes/chat.js';
import service from './routes/services.js';
//import users from './routes/users.js';
import product from './routes/product.js'

app.use('/api/auth', auth); 
app.use('/api/chat', chat);
app.use('/api/service', service);
app.use('/api/product', product);

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`))

mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
    process.exit(1);
});


/*
const openai = new OpenAI({
    apiKey: APIKey
})// Configuration
*/