//Conctar com o backend para enviar os dados do login

// Detecta se está em ambiente local ou de produção
const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
const API_URL = isLocal
  ? "http://localhost:3000"
  : "https://login-mdwllab.onrender.com";

const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.querySelector("input[name='email']").value.trim();
  const password = form.querySelector("input[name='password']").value;

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json(); // <-- login

    if (res.ok) {
      localStorage.setItem("userEmail", email);

      // Agora envia o código
      try {
        const codeRes = await fetch(`${API_URL}/send-code`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          credentials: "include",
        });

        const codeData = await codeRes.json(); // <-- nome correto da variável

        if (codeRes.ok && codeData.success) {
          alert("Código enviado ao e-mail!");
          window.location.href = "/twofactors.html";
        } else {
          alert(codeData.message || "Erro ao enviar o código.");
        }
      } catch (err) {
        console.error("Erro ao enviar código:", err);
        alert("Erro ao conectar com o servidor");
      }

    } else {
      alert(data.message || "Erro no login");
    }
  } catch (error) {
    console.error("Erro no login:", error);
    alert("Erro ao conectar com o servidor");
  }
});

function togglePassword() {
      const password = document.getElementById("password");
      const icon = document.querySelector(".toggle-password");

      if (password.type === "password") {
        password.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        password.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    }


