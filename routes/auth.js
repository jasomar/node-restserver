import {Router} from 'express';
import {check} from 'express-validator';
import {login} from '../controllers/auth.js';
import {validateRequest} from '../middlewares/validate-request.js';

const auth = Router();

auth.post('/login',[
    check('mail','Mail is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateRequest
],login);

export {auth}