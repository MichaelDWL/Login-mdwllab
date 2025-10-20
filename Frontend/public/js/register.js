
const API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3000"
  : "https://login-mdwllab.onrender.com";
  
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
                

            const res = await fetch(`${API_URL}/register`, { 
            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            
            body: JSON.stringify({ email, username, password }), 
            credentials: 'include' // Incluir cookies na requisição 
            });

            const data = await res.json(); // Supondo que o backend retorne uma resposta JSON

            if (res.ok) { 
            alert(data.message); // Exibir mensagem de sucesso
            window.location.href = "/Frontend/public/index.html"; // Redirecionar para a página home
            } else {
            alert(data.message || "Erro no registro"); // Exibir mensagem de erro
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor");
        }

    }


});

const passwordInput = document.getElementById("password"); 

passwordInput.addEventListener("input", () => { 
    const password = passwordInput.value;

    document.getElementById("length").className = password.length >= 8 ? "password-hint" : "password-hint invalid"; 

    document.getElementById("case").className = /^(?=.*[a-z])(?=.*[A-Z])/.test(password) ? "password-hint" : "password-hint invalid";
    document.getElementById("number").className = /^(?=.*[0-9])/.test(password) ? "password-hint" : "password-hint invalid";
    // document.getElementById("especial").className = /^[@$!%*?&]/.test(password) ? "password-hint" : "password-hint invalid";
    document.getElementById("especial").className = /^(?=.*[!@#$%^&*])/.test(password) ? "password-hint" : "password-hint invalid";
})



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








// const password = form.querySelector("input[name = 'password' ]");

//     password.addEventListener("input", (event) => {
//         const upperCaseLowerCaseRegex = /^(?=.*[a-z])(?=.*[A-Z])/
//         const upperCaseLowerCaseHint = document.getElementById('case')

//         if (upperCaseLowerCaseRegex.test(event.target.value)) {
//             console.log('teste')
//             upperCaseLowerCaseHint.classList.remove('invalid')
//         } else {
//             upperCaseLowerCaseHint.classList.add('invalid')
//         }

        // upperCaseLowerCaseRegex.test(event.target.value) ? upperCaseLowerCaseHint.classList.remove('invalid') : upperCaseLowerCaseHint.classList.add('invalid')

    // document.getElementById("especial").classList.remove("invalid");
    // = /[@$!%*?&]/.test(password) ? "valid" : "invalid";
    // document.getElementById("length").className = password.length >=8 ? "valid" : "invalid";
    // document.getElementById("case").className = /[^[a-zA-Z]+$]/.test(event.target.value) ? "valid" : "invalid";
    // 


// const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// if (!passwordregex.test(password)) {
//     alert("A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
//     return;

// });
