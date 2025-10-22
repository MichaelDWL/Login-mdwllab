// db.js
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Criar um pool de conexões
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10, // até 10 conexões simultâneas
  queueLimit: 0,
});

// Exportar a versão com suporte a promises
export default pool.promise();