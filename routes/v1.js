const express = require('express');
const app = express();
const user = require('./user/authroutes');
const admin = require('./admin/authrouth');
const swagger = require('./swaggerui');
app.use('/user', user)
app.use('/admin', admin)
app.use('/swagger', swagger)

module.exports = app