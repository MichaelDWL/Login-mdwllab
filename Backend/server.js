import express from "express"; // importar o modulo do express
import cors from "cors"; // importar o modulo do cors
import path from "path"; // importar o modulo path
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"; // importar o modulo jsonwebtoken
import db from "./db.js"; // Conexão com o banco de dados
import { comparePassword,hashPassword } from "./app.js"; // Função para comparar senhas
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { generateKey } from "crypto";

import { sendEmail } from "./app.js";
import e from "express";

dotenv.config();

// Correção para usar __dirname em módulos ES

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;
const secret = process.env.JWT_SECRET; // Senha secreta para assinar o token JWT

let generatedCode = null; // código temporário


// Middleware


app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"], // permita ambos
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

setInterval(() => {
  db.query("UPDATE users SET verification_code = NULL, code_expires_at = NULL WHERE code_expires_at < NOW()");
}, 10 * 60 * 1000); // Limpa códigos expirados a cada 10 minutos

// ------------Rota de Login------------ //

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await db
      .promise()
      .query(`SELECT id, password FROM users WHERE email = ?`, [email]);

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Usuário ou senha inválidos" });
    }

    const user = results[0];
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Usuário ou senha inválidos" });
    }

    // Login válido — pede autenticação de dois fatores
    return res.status(200).json({
      success: true,
      message: "Login válido. Código de verificação necessário.",
      userId: user.id,email
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ success: false, message: "Erro no servidor" });
  }
});



  
// ------------FIM ROTA DE LOGIN------------ //

// ------------ROTA DE ENVIAR O EMAIL------------ //

app.post("/send-code", async (req, res) => { 
  const {email, userId} = req.body;
  console.log(email, userId);

  res.cookie("pending_user", email, {
  httpOnly: true,
  sameSite: "lax"
  });

    try {

    // Gera o código de 5 dígitos
    const code = String(Math.floor(10000 + Math.random() * 90000));
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // expira em 5 min

    // Atualiza o banco
    await db
      .promise().query(
        "UPDATE users SET otp_code = ?, otp_expires = ? WHERE email = ?",
        [code, expiresAt, email]
      );

    // Envia o e-mail com o código
    const result = await sendEmail(email, code);

    if (result.success) {
      console.log(code);
      res.cookie("pending_user", email, { httpOnly: true });
      return res.status(200).json({ success: true, message: "Código enviado ao e-mail." });
    } else {
      return res.status(500).json({ success: false, message: "Erro ao enviar e-mail." });
    }

  } catch (error) {
    console.error("Erro ao gerar/enviar código:", error);
    return res.status(500).json({ success: false, message: "Erro no servidor." });
  }
});
// ------------FIM DA ROTA DE ENVIAR O EMAIL------------ //

// ------------Rota protegida que requer autenticação------------ // 

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.email}!` });
});
// ------------FIM Rota protegida------------ // 

// ------------ROTA LOGOUT------------ // 

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout realizado" });
});

// ------------FIM ROTA LOGOUT------------ // 

// Middleware para autenticar token JWT
function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "não autenticado" }); // Se não houver token, não autorizado

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(403).json({ message: "token inválido" });
    req.user = decoded;
    next();
  });
}

// ------------Rota de Registro------------ //  

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*]).{8,}$/;
   
    // Verifica se existe cadastro com esse email 
    db.query("SELECT EMAIL FORM USERS WHERE EMAIL = ?", [email], (err, results) => {   

      
      if (results !== undefined && results.length > 0) { 
        return res.json({message: "Email já cadastrado, insira um email valido"})
      }

    }) 
    
    // Verifica se a senha atende os requisitos minimos 
      if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "A senha não atende aos requisitos mínimos" });
    }

  // Criptografa a senha 
  const hashPass = await hashPassword(password)

    // Salva os dados no banco de dados 

    db.query(
    " insert into users (username, email, password) values (?,?,?)", [username, email, hashPass],
    (err, results) => {
    
    // Tratamento de exceções 
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
// ------------FIM DA ROTA DE REGISTRO------------ // 



// ------------Rota Atenticação de 2 fatores------------ //
app.post("/verify", (req, res) => {
  const { code } = req.body;
  const pendingEmail = req.cookies.pending_user;
  
  console.log("Todos os cookies:", req.cookies); // 👈 veja se o cookie veio
  console.log("pending_user:", req.cookies.pending_user); // 👈 e se tem o email esperado
  
  console.log(pendingEmail);
  db.query(
    "SELECT * FROM users WHERE email = ? AND otp_code = ? AND otp_expires > NOW()",
    [pendingEmail, code],

    
    (err, results) => {
      if (err) return res.status(500).json({ message: "Erro no servidor" });
      if (results.length === 0) return res.status(401).json({ message: "Código inválido ou expirado" });

      const user = results[0];

      // Limpa o código (pra não ser reutilizado)
      db.query("UPDATE users SET otp_code = NULL, otp_expires = NULL WHERE id = ?", [user.id]);

      // Gera token JWT
      const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: "1h" });

      res.cookie("token", token, { httpOnly: true });
      res.clearCookie("pending_user"); // <- limpa o cookie
      return res.status(200).json({ success: true,message: "Autenticação concluída com sucesso!" });

    }
  );
});


//INICIA SERVIDOR

app.listen(port, () => console.log("Server is running on port 3000"));
