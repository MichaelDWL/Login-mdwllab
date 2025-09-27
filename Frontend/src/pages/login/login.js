//Conctar com o backend para enviar os dados do login
const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Evitar o comportamento padrão do formulário para controlar pelo JavaScript

    const username = form.querySelector("input[name = 'username']").value.trim();
    const password = form.querySelector("input[name = 'password']").value;

    try {
        const res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ username, password }),
          credentials: 'include' // Incluir cookies na requisição
        });

        const data = await res.json(); // Supondo que o backend retorne uma resposta JSON

        if (res.ok) { 
          alert(data.message); // Exibir mensagem de sucesso
          window.location.href = "twofactors.html"; // Redirecionar para a página home
        } else {
          alert(data.message || "Erro no login"); // Exibir mensagem de erro
        }
    } catch (error) {
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

function criptografarSenha() {


}