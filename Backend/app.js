//APIS 
//autenticação 2 fatores

import nodemailer from "nodemailer";

export async function sendEmail(email, generatedCode) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "factortwo900@gmail.com",
        pass: "bfhe dtzc utoq ywez" // senha de app do Gmail
      },
    });

    await transporter.sendMail({
          from: process.env.gmail_user,
          to: [email],
          subject: "Seu código de verificação",
          text: `Seu código é: ${generatedCode}`,
        });
  return ({ success: true, message: "Código de verificação enviado para o e-mail" });

  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return ({ success: false, message: "Erro ao enviar e-mail" });
    }
}

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
