import express from 'express';

import methodOverride from 'method-override';

export const app = express();

const PORT = 3001;


app.use(methodOverride('_method'));

import auth from './routes/auth';
import services from './routes/services';
import users from './routes/users';
import support from './routes/support';

app.use('/api/auth', auth); // Register; Login;           Logout?; Forgot Password?; Reset Password?
app.use('/api/services', services) // Preços, etc, etc
app.use('/api/users', users) // Obter dados do usuário; Atualizar dados do usuário; Deletar conta
app.use('/api/support', support) // Chat Obter ajuda com AI

app.set('view engine', '')
app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`))
