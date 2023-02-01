import {response} from 'express'

const userGet = (req, res = response)=> {
    const {hola,teamo} = req.query;
    res.json({
        msg:'get api controller',
        hola,
        teamo
    });
}


const userPut = (req, res = response)=> {
    
    const id = req.params.id
    res.json({
        msg:'put api',
        id
    });
}

const userPost = (req, res)=> {
    const body = req.body;

    res.json({
        msg:'post controller',
        body
    })
}


const userDelete = (req, res = response)=> {
    res.json({
        msg:'delete controller'
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