const form = document.getElementById("register-form"); 

form.addEventListener("submit", async (e) => { 
    e.preventDefault();

    const email = form.querySelector("input[name = 'email' ]").value.trim(); 
    const username = form.querySelector("input[name = 'username' ]").value.trim(); 
    const password = form.querySelector("input[name = 'password' ]").value; 
    const passwordCompare = form.querySelector("input[name = 'password-compare']").value;

    if (password !== passwordCompare) {
        alert(" As senhas não coincidem!");
        return;
    }
        
    else{
            try {
                

            const res = await fetch("http://localhost:3000/register", { 
            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify({ email, username, password }), 
            credentials: 'include' // Incluir cookies na requisição 
            });

            const data = await res.json(); // Supondo que o backend retorne uma resposta JSON

            if (res.ok) { 
            alert(data.message); // Exibir mensagem de sucesso
            window.location.href = "/Frontend/src/pages/login/index.html"; // Redirecionar para a página home
            } else {
            alert(data.message || "Erro no registro"); // Exibir mensagem de erro
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor");
        }

    }

});
