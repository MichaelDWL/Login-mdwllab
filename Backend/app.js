//APIS 
//autenticação 2 fatores

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(email, generatedCode) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Login MDWL <no-reply@loginmdwl.com>",
      to: email,
      subject: "Seu código de verificação",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2>Confirmação de Login</h2>
          <p>Seu código de verificação é:</p>
          <h1 style="background:#f4f4f4; display:inline-block; padding:10px 20px; border-radius:8px; color:#222;">
            ${generatedCode}
          </h1>
          <p>O código expira em 5 minutos.</p>
          <p>Se você não solicitou este código, ignore este e-mail.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Erro Resend:", error);
      return { success: false };
    }

    console.log("E-mail enviado com sucesso:", data.id);
    return { success: true, message: "Código enviado para o e-mail." };
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    return { success: false, message: "Erro ao enviar e-mail." };
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
