import express from 'express';
import mongoose from 'mongoose';

//import cors from 'cors';
//import methodOverride from 'method-override';

export const app = express();

const PORT = 3001;
const MONGO_URL = 'mongodb+srv://2118622:gf2XbVViOGni6a8v@dbw.hebeym4.mongodb.net/';


//app.use(methodOverride('_method'));
app.use(express.json()) // "body-parser"
import auth from './routes/auth.js';
//import services from './routes/services.js';
//import users from './routes/users.js';
//import support from './routes/support.js';

app.use('/api/auth', auth); // Register; Login;           Logout?; Forgot Password?; Reset Password?
//app.use('/api/services', services) // Preços, etc, etc
//app.use('/api/users', users) // Obter dados do usuário; Atualizar dados do usuário; Deletar conta
//app.use('/api/support', support) // Chat Obter ajuda com AI

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`))

mongoose.connect(MONGO_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
    process.exit(1);
});
