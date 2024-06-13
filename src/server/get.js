const express = require('express');
const router = express.Router();
const connection = require('../config/db');

/**
 * @swagger
 * /api/emblemas:
 *   get:
 *     summary: Retorna todos os emblemas
 *     tags:
 *       - Emblemas
 *     responses:
 *       200:
 *         description: Lista de emblemas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   slug:
 *                     type: string
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 */
router.get("/emblemas", function (req, res) {
    const sql = 'SELECT * FROM emblemas'; 

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Erro ao executar a consulta:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        res.json(results); // Retorna os resultados como JSON
    });
});

/**
 * @swagger
 * /api/emblemas/{name}:
 *   get:
 *     summary: Retorna emblemas filtrados pelo nome
 *     tags:
 *       - Emblemas
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome para filtrar os emblemas
 *     responses:
 *       200:
 *         description: Lista de emblemas filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   slug:
 *                     type: string
 *                   name:
 *                     type: string
 *                   image:
 *                     type: string
 */
router.get("/emblemas/:name", function (req, res) {
    const { name } = req.params;

    let sql = 'SELECT * FROM emblemas';
    let params = [];

    if (name) {
        sql += ' WHERE name LIKE ?';
        params.push(`%${name}%`);
    }

    connection.query(sql, params, (error, results) => {
        if (error) {
            console.error('Erro ao executar a consulta:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        res.json(results); // Retorna os resultados como JSON
    });
});


/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Retorna todos os clientes
 *     tags:
 *       - Clients
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   emblemas:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         slug:
 *                           type: string
 *                         name:
 *                           type: string
 *                         image:
 *                           type: string
 */
router.get("/clients", function (req, res) {
    const sql = 'SELECT id, nome, JSON_UNQUOTE(emblemas) as emblemas FROM clients';

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Erro ao executar a consulta:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        // Mapeia os resultados para ajustar o formato de emblemas
        const formattedResults = results.map(result => ({
            id: result.id,
            nome: result.nome,
            emblemas: JSON.parse(result.emblemas || '[]') // Converte a string JSON em um objeto JavaScript
        }));

        res.json(formattedResults); // Retorna os resultados formatados como JSON
    });
});

/**
 * @swagger
 * /api/clients/{id}:
 *   get:
 *     summary: Retorna um cliente pelo ID
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 emblemas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       slug:
 *                         type: string
 *                       name:
 *                         type: string
 *                       image:
 *                         type: string
 *       404:
 *         description: Cliente não encontrado
 */
router.get("/clients/:id", function (req, res) {
    const { id } = req.params;
    const sql = 'SELECT id, nome, JSON_UNQUOTE(emblemas) as emblemas FROM clients WHERE id = ?'; 

    connection.query(sql, [id], (error, results) => {
        if (error) {
            console.error('Erro ao executar a consulta:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: "Client not found" });
            return;
        }

        // Formatando o resultado para retornar emblemas como um array de objetos
        const client = {
            id: results[0].id,
            nome: results[0].nome,
            emblemas: JSON.parse(results[0].emblemas || '[]') // Convertendo emblemas de string JSON para array de objetos JavaScript
        };

        res.json(client);
    });
});



module.exports = router;
