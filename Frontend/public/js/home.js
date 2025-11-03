// Detecta se está em ambiente local ou de produção
const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
const API_URL = isLocal
  ? "http://localhost:3000"
  : "https://api.mdwl.com.br";

  async function carregarUsuario() {
  try {
    const res = await fetch(`${API_URL}/user`, {
      method: "GET",
      credentials: "include" // envia o cookie JWT
    });

    const data = await res.json();

    if (res.ok && data.success) {
      document.getElementById("welcome-text").textContent =
        `Seja bem-vindo, ${data.user.username}!`;
    } else {
      document.getElementById("welcome-text").textContent = "Seja bem-vindo!";
    }
  } catch (err) {
    console.error("Erro ao carregar usuário:", err);
  }
}

carregarUsuario();
  // Verifica se o usuário tem sessão ativa no servidor
  fetch(`${API_URL}/protected`, {
    method: "GET",
    credentials: "include"
  })
  .then(res => {
    if (!res.ok) {
      alert("Acesso negado. Faça login primeiro.");
      window.location.href = "/index";
    }
  })
  .catch(() => {
    alert("Erro ao verificar sessão. Faça login novamente.");
    window.location.href = "/index";
  });

  // Botão de logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include"
    }).then(() => {
      window.location.href = "/index";
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


let indice = 0;
const slides = document.querySelectorAll('.carousel-images img');
const total = slides.length;

function mudarSlide(direcao) {
  indice = (indice + direcao + total) % total;
  document.querySelector('.carousel-images').style.transform = `translateX(-${indice * 100}%)`;
}

function toggleFullscreen() {
  const el = document.getElementById('carouselContainer');

  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    // Entra em tela cheia
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  } else {
    // Sai de tela cheia
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
}

// ✅ Detecta quando sai do modo fullscreen e reseta estilo se precisar
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    document.querySelector('.carousel-container').style.borderRadius = '12px';
  }
});

