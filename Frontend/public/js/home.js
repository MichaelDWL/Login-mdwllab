// Detecta se está em ambiente local ou de produção
const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
const API_URL = isLocal
  ? "http://localhost:3000"
  : "https://login-mdwllab.onrender.com";

    // Verifica se o usuário tem sessão ativa no servidor
    fetch(`${API_URL}protected`, {
      method: "GET",
      credentials: "include"
    })
    .then(res => {
      if (!res.ok) {
        alert("Acesso negado. Faça login primeiro.");
        window.location.href = "/index.html";
      }
    })
    .catch(() => {
      alert("Erro ao verificar sessão. Faça login novamente.");
      window.location.href = "/index.html";
    });

    // Botão de logout
    document.getElementById("logout-btn").addEventListener("click", () => {
      fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include"
      }).then(() => {
        window.location.href = "/index.html";
      });
    });

    // 🧭 Função de fullscreen
    document.getElementById("fullscreen-btn").addEventListener("click", () => {
      const iframe = document.getElementById("pdf-frame");
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.webkitRequestFullscreen) { // Safari
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) { // IE/Edge antigo
        iframe.msRequestFullscreen();
      }
    });