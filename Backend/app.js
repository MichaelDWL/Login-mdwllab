//APIS 
//autenticação 2 fatores
// Conctar com o backend para enviar o email de dois fatores
// autenticação 2 fatores
import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

let generatedCode = null; // código temporário

// Rota de login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    // gera código de 5 dígitos
    generatedCode = String(Math.floor(10000 + Math.random() * 90000));

    // envia e-mail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "seuemail@gmail.com",
        pass: "suasenha" // senha de app do Gmail
      },
    });

    try {
      await transporter.sendMail({
        from: "seuemail@gmail.com",
        to: "destinatario@teste.com",
        subject: "Seu código de verificação",
        text: `Seu código é: ${generatedCode}`,
      });

      return res.json({ success: true, message: "Código enviado para o e-mail" });
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      return res.status(500).json({ success: false, message: "Erro ao enviar e-mail" });
    }
  }

  return res.status(401).json({ success: false, message: "Usuário ou senha inválidos" });
});

// Rota de verificação do código
app.post("/verify", (req, res) => {
  const { code } = req.body;

  if (code === generatedCode) {
    return res.json({ success: true, message: "✅ Acesso liberado!" });
  }
  return res.status(400).json({ success: false, message: "❌ Código inválido" });
});

// Start do servidor
app.listen(3000, () => console.log("🚀 Servidor rodando em http://localhost:3000"));