const express = require('express');
const app = express();
const { swaggerUi, swaggerDocs } = require('./swagger.js');

const getRoutes = require('./server/get.js');
const putRoutes = require('./server/put.js');
const deleteRoutes = require('./server/delete.js');
const postRoutes = require('./server/post.js');

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', getRoutes);
app.use('/api', putRoutes);
app.use('/api', deleteRoutes);
app.use('/api', postRoutes);

app.listen(3000, function() {
    console.log('Server is running on port 3000');
    console.log('API docs available at http://localhost:3000/api-docs');
});
