const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'api_emblemas'
});

connection.connect(error => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        return;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida');
});

module.exports = connection;
