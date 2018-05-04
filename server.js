const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const actionRoutes = require('./actions/actionRoutes');
const projectRoutes =require('./projects/projectRoutes');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/actions', actionRoutes);
server.use('/api/projects', projectRoutes);


const port = 5000;
server.listen(port, () => console.log(`\n== API Running On ${port} ==\n`));