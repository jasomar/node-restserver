import  express  from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import {router} from '../routes/user.js';

class Server{
    constructor(){
        dotenv.config();
        this.port = process.env.PORT;
        this.app = express();
        this.userPath = '/api/users';
        //middleware
        this.middlewares();

        //routers
        this.routes();
    }

    routes(){
        this.app.use(this.userPath,router);
    }

    listen(){
        this.app.listen(this.port)
    } 

    middlewares(){
        // CORS
        this.app.use(cors())
        //parse and read boy
        this.app.use(express.json())
        // public directory
        this.app.use(express.static('public'))
    }
}

export {Server};