import {response} from 'express'

import {UserDB} from '../models/user.js'
import bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers/generate-jwt.js';

const login = async (req, res =response) =>{
    const {mail,password} = req.body;
    try {
        //check is email exist
        const user = await UserDB.findOne({mail})
        if (!user) {
            return res.status(400).json({
                msg: "invalid mail or password"
            })
        }
        //check user is active 
        if (!user.state) {
            return res.status(400).json({
                msg: "user doesn't exist"
            })
        }
        //check password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "user or password incorrect"
            })
        }
        //generate JWT
        const token = await generateJWT(user.id)


        res.json({
            user,
            token
        })        
    } catch (error) {
        return res.status(500).json({
            msg: user.password
        })    
    }
}

export {
    login
}