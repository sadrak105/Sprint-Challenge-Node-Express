const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());


const port = 5000;
server.listen(port, () => console.log(`\n== API Running On ${port} ==\n`));