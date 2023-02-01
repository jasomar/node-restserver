
import { fileURLToPath } from 'url';
import { dirname } from 'path';


import { Server } from './models/server.js';

//import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

///////////////////////

const server = new Server();

server.listen();

