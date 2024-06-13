const express = require('express');
const router = express.Router();
const connection = require('../config/db');

/**
 * @swagger
 * /api/emblemas/{id}:
 *   put:
 *     summary: Atualiza emblemas de um cliente pelo ID
 *     tags:
 *       - Emblemas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *           example:
 *             emblemas: 
 *               - id: 1
 *                 slug: emblema1
 *                 name: Emblema 1
 *                 image: http://example.com/emblema1.png
 *               - id: 2
 *                 slug: emblema2
 *                 name: Emblema 2
 *                 image: http://example.com/emblema2.png
 *     responses:
 *       200:
 *         description: Emblemas atualizados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 client:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *                     emblemas:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           slug:
 *                             type: string
 *                           name:
 *                             type: string
 *                           image:
 *                             type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Formato inválido para emblemas
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/emblemas/:id", function (req, res) {
    const { id } = req.params;
    const { emblemas } = req.body;

    // Verifica se o cliente existe
    const checkClientQuery = 'SELECT * FROM clients WHERE id = ?';
    connection.query(checkClientQuery, [id], (error, results) => {
        if (error) {
            console.error('Erro ao verificar o cliente:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'Cliente não encontrado' });
            return;
        }

        let client = results[0];
        let currentEmblemas = JSON.parse(client.emblemas || '[]');

        // Verifica se os emblemas estão em um formato válido
        if (!Array.isArray(emblemas)) {
            res.status(400).json({ message: 'Formato inválido para emblemas' });
            return;
        }

        // Verifica se cada emblema existe e se o cliente já possui
        const checkEmblemasQuery = 'SELECT * FROM emblemas WHERE slug IN (?)';
        const slugs = emblemas.map(slug => slug.trim());
        connection.query(checkEmblemasQuery, [slugs], (error, results) => {
            if (error) {
                console.error('Erro ao verificar os emblemas:', error);
                res.status(500).json({ message: 'Erro interno do servidor' });
                return;
            }

            const existingEmblemas = results;

            // Filtra emblemas válidos e existentes
            const validEmblemas = [];
            const alreadyOwned = [];
            const notFoundEmblemas = [];

            for (const slug of slugs) {
                const emblema = existingEmblemas.find(e => e.slug === slug);
                if (emblema) {
                    if (currentEmblemas.some(e => e.slug === slug)) {
                        alreadyOwned.push(slug);
                    } else {
                        validEmblemas.push(emblema);
                    }
                } else {
                    notFoundEmblemas.push(slug);
                }
            }

            // Atualiza os emblemas do cliente
            currentEmblemas = [...currentEmblemas, ...validEmblemas];
            const updateQuery = 'UPDATE clients SET emblemas = ? WHERE id = ?';
            const updatedEmblemasJSON = JSON.stringify(currentEmblemas);

            connection.query(updateQuery, [updatedEmblemasJSON, id], (error, result) => {
                if (error) {
                    console.error('Erro ao atualizar os emblemas:', error);
                    res.status(500).json({ message: 'Erro interno do servidor' });
                    return;
                }

                // Monta a mensagem de resposta de acordo com cada caso
                if (validEmblemas.length > 0 && alreadyOwned.length > 0) {
                    res.status(200).json({
                        client: { ...client, emblemas: currentEmblemas },
                        message: `Emblema(s) '${validEmblemas.map(e => e.slug).join(', ')}' adicionado(s) com sucesso. Emblema(s) '${alreadyOwned.join(', ')}' já pertence(m) ao cliente.`
                    });
                } else if (validEmblemas.length > 0) {
                    res.status(200).json({
                        client: { ...client, emblemas: currentEmblemas },
                        message: `Emblema(s) '${validEmblemas.map(e => e.slug).join(', ')}' adicionado(s) com sucesso.`
                    });
                } else if (alreadyOwned.length > 0) {
                    res.status(200).json({
                        client: { ...client, emblemas: currentEmblemas },
                        message: `Emblema(s) '${alreadyOwned.join(', ')}' já pertence(m) ao cliente.`
                    });
                } else {
                    res.status(200).json({
                        client: { ...client, emblemas: currentEmblemas },
                        message: `Nenhum emblema adicionado ou removido.`
                    });
                }
            });
        });
    });
});

/**
 * @swagger
 * /api/clients/{id}:
 *   put:
 *     summary: Atualiza as informações de um cliente pelo ID
 *     tags:
 *       - Clients
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 client:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nome:
 *                       type: string
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put("/clients/:id", function (req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    // Verifica se o cliente existe
    const checkClientQuery = 'SELECT * FROM clients WHERE id = ?';
    connection.query(checkClientQuery, [id], (error, results) => {
        if (error) {
            console.error('Erro ao verificar o cliente:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'Cliente não encontrado' });
            return;
        }

        // Atualiza o nome do cliente
        const updateQuery = 'UPDATE clients SET nome = ? WHERE id = ?';
        connection.query(updateQuery, [nome, id], (error, result) => {
            if (error) {
                console.error('Erro ao atualizar o cliente:', error);
                res.status(500).json({ message: 'Erro interno do servidor' });
                return;
            }

            // Retorna o cliente atualizado
            res.status(200).json({ message: 'Cliente atualizado com sucesso', client: { id, nome } });
        });
    });
});

module.exports = router;
