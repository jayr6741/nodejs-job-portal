const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swaggar-ui/openapi (3).json');

app.use('/user', swaggerUi.serve);
app.get('/user', swaggerUi.setup(swaggerDocument));

module.exports = app