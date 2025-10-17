    // Verifica se o usuário tem sessão ativa no servidor
    fetch(`${API_URL}protected`, {
      method: "GET",
      credentials: "include"
    })
    .then(res => {
      if (!res.ok) {
        alert("Acesso negado. Faça login primeiro.");
        window.location.href = "/Frontend/src/pages/login/index.html";
      }
    })
    .catch(() => {
      alert("Erro ao verificar sessão. Faça login novamente.");
      window.location.href = "/Frontend/src/pages/login/index.html";
    });

    // Botão de logout
    document.getElementById("logout-btn").addEventListener("click", () => {
      fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include"
      }).then(() => {
        window.location.href = "/Frontend/src/pages/login/index.html";
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