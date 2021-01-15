require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const router = require('./src/routes');
const datebase = require('./database');
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true}));
server.use(fileUpload());
server.use(express.static(__dirname + '/public'));
server.use('/api', router);

server.listen(process.env.PORT || 3000, ()=>{
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});
