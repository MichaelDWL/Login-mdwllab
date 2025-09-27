import mysql2, { createConnection } from 'mysql2'

const db = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projeto'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

export default db;