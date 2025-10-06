import express from "express"; // importar o modulo do express
import cors from "cors"; // importar o modulo do cors
import path from "path"; // importar o modulo path
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"; // importar o modulo jsonwebtoken
import db from "./db.js"; // Conexão com o banco de dados
import { comparePassword,hashPassword } from "./app.js"; // Função para comparar senhas

import dotenv from "dotenv";
dotenv.config();



import { fileURLToPath } from "url";

// Correção para usar __dirname em módulos ES

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
const secret = process.env.JWT_SECRET; // Senha secreta para assinar o token JWT

// Middleware

app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Substituir pela URL do seu frontend
    credentials: true, // Permitir envio de cookies
  })
);

app.use(express.json());
app.use(cookieParser());

// Rotas de Login

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    `SELECT password FROM users WHERE email = ?`,
    [email],
    async (err, results) => {
        if (err) {
            console.error(err);
            return results.status(500).json({ message: "Erro no servidor" });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ message: "Usuário ou senha inválidos" });
        }

        const hashedPassword = results[0].password;
        const isPasswordValid = await comparePassword(password, hashedPassword);

        if (isPasswordValid === false) {
            return res.status(401).json({ message: "Usuário ou senha inválidos" }); 
        }
        
        return res.status(200).json({ message: 'Login bem-sucedido!' });
    
    }
  );

});


// INICIO DO JWT    
//             const user = results[0];

//             //Gerar um token JWT

//             const token = jwt.sign({ id: user.id, email: user.email },
//                 secret,
//                 { expiresIn: '1h' }

//             );

//     //Enviar o token como cookie HTTP-only

//     res.cookie('token', token, {
//         httpOnly: true,
//         secure: false, // Defina como true se estiver usando HTTPS
//         sameSite: 'Lax'
//     });
//

//     }
//     );
// });

// middleware para verificar se o usuário está autenticado

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "não autenticado" }); // Se não houver token, não autorizado

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "token inválido" });
    req.user = decoded;
    next();
  });
}

// Rota protegida que requer autenticação

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.email}!` });
});

//Logout (remover o cookie)

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout realizado" });
});

// Rota de Registro 

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  // const wrong = 0; 

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "A senha não atende aos requisitos mínimos" });
    }

  const hashPass = await hashPassword(password)

  console.log(username,email,password)


  db.query(
    " insert into users (username, email, password) values (?,?,?)", [username, email, hashPass],
    (err, results) => {
    
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erro no servidor" });
    }
    if (results === 0){ 
      console.error(err);
      return res.status(501).json({ message: "Erro ao registrar usuário" });
    }  
  
    return res.status(201).json({ message: "Usuário registrado com sucesso" });
  });
});

//INICIA SERVIDOR

app.listen(port, () => console.log("Server is running on port 3000"));
