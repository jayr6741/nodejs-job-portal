const express = require('express');
const app = express()
const login = require('../../controller/admin/login');
const adminmidelware = require("../../middleware/adminmiddelware")
app.post('/login', login);




module.exports = app