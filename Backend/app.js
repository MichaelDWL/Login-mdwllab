//APIS 
//autenticação 2 fatores
// Conctar com o backend para enviar o email de dois fatores
// autenticação 2 fatores
// import express from "express";
// import nodemailer from "nodemailer";

// const app = express();
// app.use(express.json());

// let generatedCode = null; // código temporário

//     // gera código de 5 dígitos
//     generatedCode = String(Math.floor(10000 + Math.random() * 90000));

//     // envia e-mail
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "seuemail@gmail.com",
//         pass: "suasenha" // senha de app do Gmail
//       },
//     });

//     try {
//       await transporter.sendMail({
//         from: "seuemail@gmail.com",
//         to: "destinatario@teste.com",
//         subject: "Seu código de verificação",
//         text: `Seu código é: ${generatedCode}`,
//       });

//       return res.json({ success: true, message: "Código enviado para o e-mail" });
//     } catch (error) {
//       console.error("Erro ao enviar email:", error);
//       return res.status(500).json({ success: false, message: "Erro ao enviar e-mail" });
//     }

// // Rota de verificação do código
// app.post("/verify", (req, res) => {
//   const { code } = req.body;

//   if (code === generatedCode) {
//     return res.json({ success: true, message: "✅ Acesso liberado!" });
//   }
//   return res.status(400).json({ success: false, message: "❌ Código inválido" });
// });

// parte do Thalys

//bcrypt - criptografia de senhas

// utils/passwordUtils.js

import bcrypt from "bcrypt";

// número de rounds para gerar o hash (quanto maior, mais seguro, mas mais lento)
const saltRounds = 10;

/**
 * Gera o hash da senha
 * @param {string} password - senha original digitada pelo usuário
 * @returns {Promise<string>} - hash seguro da senha
 */
  export async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compara uma senha digitada com o hash salvo no banco
 * @param {string} password - senha digitada
 * @param {string} hashedPassword - hash salvo no banco
 * @returns {Promise<boolean>} - true se bater, false caso contrário
 */

export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
