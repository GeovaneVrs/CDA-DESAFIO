const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API Documentation with Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./server/*.js'], 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
