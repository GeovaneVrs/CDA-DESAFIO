const express = require('express');
const router = express.Router();
const connection = require('../config/db');

/**
 * @swagger
 * /api/clients/{id}:
 *   delete:
 *     summary: Deleta um cliente pelo ID
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente a ser deletado
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       404:
 *         description: Cliente não encontrado
 */

router.delete("/clients/:id", function (req, res) {
    const { id } = req.params;
    const sql = 'DELETE FROM clients WHERE id = ?';

    connection.query(sql, [id], (error, result) => {
        if (error) {
            console.error('Erro ao executar a exclusão:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Cliente não encontrado' });
            return;
        }

        res.status(200).json({ message: 'Cliente deletado com sucesso' });
    });
});

module.exports = router;
