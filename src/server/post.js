const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const bcrypt = require('bcryptjs'); // Para hash de senha

/**
 * @swagger
 * /api/clients:
 *   post:
 *     summary: Adiciona um novo cliente
 *     tags:
 *       - Clients
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nome:
 *                 type: string
 *               emblemas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     slug:
 *                       type: string
 *                     name:
 *                       type: string
 *                     image:
 *                       type: string
 *     responses:
 *       '200':
 *         description: Cliente adicionado com sucesso
 *       '400':
 *         description: O ID do cliente já existe
 *       '500':
 *         description: Erro interno do servidor
 */

router.post("/clients", function (req, res) {
    const { id, nome, emblemas } = req.body;

    // Verificar se o ID já existe
    const checkIdQuery = 'SELECT * FROM clients WHERE id = ?';
    connection.query(checkIdQuery, [id], (error, results) => {
        if (error) {
            console.error('Erro ao verificar o ID:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        if (results.length > 0) {
            res.status(400).json({ message: 'Este ID de cliente já existe' });
            return;
        }

        // Se o ID não existir, proceder com a inserção do cliente
        const insertQuery = 'INSERT INTO clients (id, nome, emblemas) VALUES (?, ?, ?)';
        connection.query(insertQuery, [id, nome, JSON.stringify(emblemas || [])], (error, result) => {
            if (error) {
                console.error('Erro ao adicionar o cliente:', error);
                res.status(500).json({ message: 'Erro interno do servidor' });
                return;
            }

            res.status(200).json({ message: 'Cliente adicionado com sucesso' });
        });
    });
});

module.exports = router;
