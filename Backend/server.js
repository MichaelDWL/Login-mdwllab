import express from 'express' // importar o modulo do express
import cors from 'cors' // importar o modulo do cors
import path from 'path' // importar o modulo path 
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken' // importar o modulo jsonwebtoken
import db from "./db.js" // Conexão com o banco de dados



import { fileURLToPath } from 'url';

// Correção para usar __dirname em módulos ES

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 3000;
const secret = 'seusegredo'; // Substitua por uma boa senha 

// Middleware

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Substituir pela URL do seu frontend
    credentials: true // Permitir envio de cookies 
}));

app.use(express.json());
app.use(cookieParser());

// Rotas de Login 

app.post('/login', (req, res) => {
    const { username, password } = req.body;

        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
           if (err) {
            console.error(err); // para logar no terminal
            return res.status(500).json({ message: 'Erro no servidor' });
}

            if (results.length === 0) {
                return res.status(401).json({ message: 'usuario ou senha inválidos' });
            }

            const user = results[0];

            //Gerar um token JWT

            const token = jwt.sign({ id: user.id, username: user.username }, 
                secret, 
                { expiresIn: '1h' }

            );

            //Enviar o token como cookie HTTP-only

            res.cookie('token', token, {
                httpOnly: true,
                secure: false, // Defina como true se estiver usando HTTPS
                sameSite: 'Lax'
            });
                return res.json({ message: 'Login bem-sucedido!' });

            }
            );
        });

// middleware para verificar se o usuário está autenticado

function authenticateToken(req, res, next) {
    
    const token = req.cookies.token;

    if (!token) return res.status(401).json({message: 'não autenticado'}); // Se não houver token, não autorizado
    
    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'token inválido' });
        req.user = decoded;
        next();
    });
    

}

// Rota protegida que requer autenticação 

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.user.username}!`});
});

//Logout (remover o cookie)

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout realizado'});
});


//INICIA SERVIDOR

app.listen(port, () => console.log('Server is running on port 3300'))
