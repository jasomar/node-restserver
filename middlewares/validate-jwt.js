import { response, request } from'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import {UserDB} from '../models/user.js'

dotenv.config();
const key = process.env.SECRETORPRIVATEKEY;

const validateJWT = async (req = request, res = response, next) =>{
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg:'missing token'
        });
    }
    try {
        const {uid} =  jwt.verify(token,key);
        //read user
        const user = await UserDB.findById(uid);

        // check if user exist or not
        if (!user) {
            return res.status(401).json({
                msg:'invalid token - user doent exist'
            })
        }

        //validate if state is true
        if(!user.state){
            return res.status(401).json({
                msg:'invalid token'
            })            
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:'invalid token'
        })
    }
}

export{validateJWT}