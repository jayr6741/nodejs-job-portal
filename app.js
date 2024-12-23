const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const mongodb = require('./library/db');
mongodb();

const v1 = require('./routes/v1');
app.use('/v1',v1)



app.listen(process.env.PORT, () => {
    console.log('server start for PORT: ', process.env.PORT);
})