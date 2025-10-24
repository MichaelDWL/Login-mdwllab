
// Detecta se está em ambiente local ou de produção
const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
const API_URL = isLocal
  ? "http://localhost:3000"
  : "https://login-mdwllab.onrender.com";

// Seleciona o formulário
const form = document.getElementById("code-form");
const resendBtn = document.getElementById("resend-btn");
const timerDisplay = document.getElementById("timer");

let countdown; // vai armazenar o setInterval
let remainingTime = 60; // tempo em segundos

const email = localStorage.getItem("userEmail");
  
  if (!email) {
  alert("Email não encontrado. Faça login novamente.");
  window.location.href = "/login.html";
  }


// Passa automaticamente para o próximo campo ao digitar
const inputs = document.querySelectorAll("input[name='code']");

inputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value;

    // Vai pro próximo input automaticamente
    if (value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener("keydown", (e) => {
    // Se apertar Backspace em um campo vazio, volta pro anterior
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

// Função para iniciar contagem regressiva
function startCountdown() {
  resendBtn.disabled = true;
  remainingTime = 60;
  timerDisplay.textContent = `Reenviar código em ${remainingTime}s`;
  resendBtn.style.opacity = "30%";

  countdown = setInterval(() => {
    remainingTime--;
    timerDisplay.textContent = `Reenviar código em ${remainingTime}s`;

    if (remainingTime <= 0) {
      clearInterval(countdown);
      resendBtn.disabled = false;
      timerDisplay.textContent = "Reenviar código";
      resendBtn.style.opacity = "100%";
    }
  }, 1000);
}

// Chama assim que o código for enviado pela primeira vez
startCountdown();

// Função para enviar novo código
resendBtn.addEventListener("click", async () => {
  resendBtn.disabled = true;

  try {
      const res = await fetch(`${API_URL}/send-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email}),
      credentials: "include"
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert("Novo código enviado ao e-mail!");
      startCountdown();
    } else {
      alert(data.message || "Erro ao reenviar o código.");
      resendBtn.disabled = false;
    }
  } catch (err) {
    console.error("Erro ao reenviar código:", err);
    alert("Erro ao conectar com o servidor");
    resendBtn.disabled = false;
  }
});

// Verifica o código quando o formulário é enviado
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Junta os 5 dígitos em um único código
  const code = Array.from(form.querySelectorAll("input[name='code']"))
    .map(input => input.value)
    .join("");  

  if (code.length !== 5) {
    alert("Por favor, preencha os 5 dígitos.");
    return;
  }

  
  try {
      const res = await fetch(`${API_URL}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify({ code })
    });

    const data = await res.json();

    console.log(data);
    
    if (res.ok && data.success) {
      alert("Acesso liberado!");
      localStorage.removeItem("userEmail"); // lImpa o email armazenado
      window.location.href = "/home.html"; // redireciona para home/dashboard
    } else {
      alert(data.message || "Código inválido!");
    }
    
  } catch (err) {
    console.error("Erro ao verificar código:", err);
    alert("Erro ao conectar com o servidor");
  }
});


