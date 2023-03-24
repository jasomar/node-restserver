import { RoleDB } from '../models/role.js';
import { UserDB } from '../models/user.js';


const isRoleValid = async(role = '')=> {
    const existRole = await RoleDB.findOne( {role} );
    if (!existRole) {
        throw new Error(`Role '${role}' isn't valid`)
    }
}

const checkMailExist = async(mail = '' )=>{
    const existMail = await UserDB.findOne({mail});
    if (existMail) {
        throw new Error(`Mail: '${mail}' already exist.`)
    }
}


const userById = async(id)=>{
    const existUser = await UserDB.findById(id);
    if (!existUser) {
        throw new Error(`Id: '${id}' is not registed.`)
    }
}

export {isRoleValid,checkMailExist,userById}