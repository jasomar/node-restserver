import {response} from 'express'

import {UserDB} from '../models/user.js'

import bcrypt from 'bcryptjs';


const userGet = async(req, res = response)=> {

    const {limit = 5, from = 0 } = req.query;
    const query = {state:true}
    // exec two preomises at same time
    // only return if both are ok
    const [total, user] = await Promise.all([
        UserDB.count(query),
        UserDB.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({
        total, 
        user
    });
}

const userPut = async(req, res = response)=> {
    const {id} = req.params;
    const {_id,password, google,mail, ...userPut} = req.body; //remove arg from body request

    if(password){
        // encrypt password
        const salt = bcrypt.genSaltSync();
        userPut.password = bcrypt.hashSync(password,salt)
    }
    const user = await UserDB.findByIdAndUpdate(id,userPut, {new: true});
    res.json(user);
}

 const userPost = async (req, res = response)=> {
    const {name, mail, password,role} = req.body;
    const user = new UserDB({name, mail, password,role});
    // encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password,salt)
    //save user
    await user.save();
    res.json({
        msg:'post controller',
        user
    })
}

const userDelete = async(req, res = response)=> {
    const {id} = req.params;

    const user = await UserDB.findByIdAndUpdate(id,{state: false});

    res.json({
        user
    });
}

const userPatch = (req, res = response)=> {
    res.json({
        msg:'patch controller'
    });
}

export {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}