
import { validationResult } from 'express-validator';
import { response, request } from'express';

const validateRequest = (req = request, res = response, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}

export{validateRequest}