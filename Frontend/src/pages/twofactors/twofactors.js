// Seleciona o formulário
const form = document.getElementById("twofactor-form");

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
    const res = await fetch("http://localhost:3000/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      credentials: "include" // importante caso use sessão/cookies
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert("Acesso liberado!");
      window.location.href = "index.html"; // redireciona para home/dashboard
    } else {
      alert(data.message || "Código inválido!");
    }
  } catch (err) {
    console.error("Erro ao verificar código:", err);
    alert("Erro ao conectar com o servidor");
  }
});

