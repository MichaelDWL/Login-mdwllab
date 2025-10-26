# 🔐 Projeto de Login com Autenticação em Duas Etapas (Node.js + MySQL)

Este projeto é um **protótipo funcional de tela de login com autenticação de dois fatores (2FA)**, desenvolvido para um **trabalho acadêmico sobre segurança da informação**.  
A aplicação foi construída em **Node.js puro**, com **Express.js** no backend e **MySQL** como banco de dados hospedado na **Railway**.

---

<p align="center">
  <img alt="License" src="./Frontend/public/assets/Screen.png">
</p>

---
## 📂 Estrutura de Pastas

```
LOGIN-MDWLLAB/
│
├── Backend/
│  ├── app.js              # Envio de e-mails e funções utilitárias
│  ├── db.js               # Conexão com o banco de dados MySQL
│  ├── server.js           # Servidor principal e rotas
│  ├── .env                # Variáveis de ambiente (não versionado)
│  ├── package.json        # Dependências e scripts
│  └── node_modules/
│
└── Frontend/
   └── public/
      ├── assets/
      ├── js/
      │  ├── login.js          
      │  ├── register.js
      │  ├── twofactors.js
      │  └── home.js
      ├── styles/
      │  ├── style.css
      │  ├── home.css
      ├── login.html        #Index.html
      ├── register.html
      ├── twofactors.html
      └── home.html
```

---

## ⚙️ Tecnologias Utilizadas

### 🖥️ Backend
- Node.js
- Express.js
- MySQL2
- jsonwebtoken (JWT)
- bcrypt
- dotenv
- Resend API (envio de e-mails)
- express-session
- cookie-parser
- cors

### 🧭 Frontend
- HTML5, CSS3 e JavaScript puro (sem frameworks)

---

## 🚀 Funcionalidades

✅ Registro de usuários com **criptografia de senha (bcrypt)**  
✅ Login com **limite de tentativas e bloqueio temporário**  
✅ **Autenticação de dois fatores (2FA)** via código enviado por e-mail  
✅ **Cookies HTTP-Only** para proteção de sessão  
✅ Rotas protegidas com **JWT (JSON Web Token)**  
✅ Integração com **Resend API** para envio de código de verificação  
✅ Banco de dados **MySQL hospedado na Railway**

---

## 🧩 Como Executar Localmente

### 🔸 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/login-mdwllab.git
cd login-mdwllab/Backend
```

---

### 🔸 2. Instale as dependências

```bash
npm install
```

---

### 🔸 3. Configure o arquivo `.env`

Crie um arquivo chamado **`.env`** dentro da pasta `Backend/` com o seguinte conteúdo:

```env
# Porta do servidor
PORT= ex de porta 3000

# Chave secreta para JWT
JWT_SECRET= sua_senha_secreta

# Credenciais do banco de dados MySQL (substituir por suas crendenciais)
DB_HOST= host do banco
DB_USER= usuario do banco
DB_PASSWORD= senha do banco
DB_NAME= nome da tabela 
DB_PORT=3306

# API Key do Resend (para envio de e-mails)
RESEND_API_KEY= sua_api_key_resend
```

> ⚠️ **Importante:** nunca exponha o `.env` no GitHub!  
> O arquivo `.gitignore` já está configurado para isso.
> Caso queira fazer o deploy basta cadastrar as variaveis de ambiente na hora do deploy do backend.

---

### 🔸 4. Execute o servidor

Modo de desenvolvimento (com auto-reload):

```bash
npm run dev
```

Modo de produção:

```bash
npm start
```

---

### 🔸 5. Acesse no navegador

```bash
http://localhost:3000
```

> As páginas frontend estão na pasta `Frontend/public/`.  
> Você pode abri-las diretamente com o **Live Server** do VSCode.

---

## ⚠️ Observação Importante

> Algumas **rotas do frontend (JavaScript)** estão configuradas para apontar para o domínio hospedado no **Render** (`https://ex-meurender.onrender.com`).  
> Caso você execute o projeto **localmente**, será necessário **editar essas rotas** para que elas apontem para o seu servidor local, por exemplo:

```js
// Exemplo de ajuste no arquivo login.js
// Antes:
fetch("https://ex-meurender.onrender.com/login", ...)

// Depois:
fetch("http://localhost:3000/login", ...)
```

> Faça o mesmo ajuste nos arquivos `register.js`, `twofactors.js` e `home.js`, onde houver chamadas `fetch()` ou `axios()` para o backend.

---

## 💡 Fluxo de Autenticação

1. **Usuário se registra** → senha é criptografada com **bcrypt**.  
2. **Usuário faz login** → se as credenciais estiverem corretas, o sistema envia um **código 2FA** por e-mail.  
3. **Usuário insere o código** → o servidor valida e gera um **token JWT**.  
4. **Acesso liberado** às rotas protegidas (`/home`, `/protected`, etc).

---

## 🛡️ Segurança Implementada

- Criptografia de senha com **bcrypt**
- Cookies **HTTP-Only + Secure + SameSite**
- Tokens JWT com **expiração**
- **Limite de tentativas de login** com bloqueio automático
- **Expiração automática de códigos 2FA**
- Dados sensíveis gerenciados por **variáveis de ambiente**

---

## 📚 Créditos

Projeto desenvolvido por **@MichaelDWL** e **@thalts_lz**   
📘 Trabalho acadêmico de Segurança da Informação — 2025  
👨‍💻 Tecnologias: Node.js, Express, MySQL, Resend API

---

## 🧠 Melhorias Futuras

- Implementar recuperação de senha via e-mail  
- Adicionar autenticação via aplicativo (Google Authenticator, Authy)  
- Migrar frontend para **React ou Next.js**  
- Criar pipeline de deploy automatizado

---

## 📝 Licença

Este projeto é de uso **educacional** e livre para estudo e aprimoramento.  
Sinta-se à vontade para clonar, adaptar e contribuir!  

---

💙 **Feito com dedicação para demonstrar boas práticas de autenticação e segurança em aplicações web.**
