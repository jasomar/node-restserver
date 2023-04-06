import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const key = process.env.SECRETORPRIVATEKEY;

const generateJWT = (uid = '') =>{

    return new Promise((resolve, reject)=>{
        const payload ={uid};
        jwt.sign(payload,key,{
            expiresIn:'365d'
            },(err,token) =>{
                if(err){
                    console.log(err);
                    reject("Error to create JWT")
                }else{
                    resolve(token)
                }
            }
        )
    })
}


export {generateJWT}