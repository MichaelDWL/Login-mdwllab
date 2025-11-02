// Detecta se está em ambiente local ou de produção
const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
const API_URL = isLocal
  ? "http://localhost:3000"
  : "https://api.mdwl.com.br";

    // Verifica se o usuário tem sessão ativa no servidor
    fetch(`${API_URL}/protected`, {
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
function ativarTelaCheia() {
  const iframeContainer = document.querySelector('.iframe-container');

  // Tenta o fullscreen nativo (funciona no Android e desktop)
  if (iframeContainer.requestFullscreen) {
    iframeContainer.requestFullscreen();
  } else if (iframeContainer.webkitRequestFullscreen) { // Safari
    iframeContainer.webkitRequestFullscreen();
  } else {
    // Fallback iOS: simula fullscreen escondendo o resto
    document.body.style.overflow = 'hidden';
    document.querySelector('main').style.display = 'none';
    iframeContainer.style.position = 'fixed';
    iframeContainer.style.top = '0';
    iframeContainer.style.left = '0';
    iframeContainer.style.width = '100vw';
    iframeContainer.style.height = '100dvh';
    iframeContainer.style.zIndex = '9999';
  }
}