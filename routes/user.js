import {Router} from 'express';
import {check} from 'express-validator';

import {validateRequest, validateJWT, isAdminRole, hasRole} from '../middlewares/index.js'

import {isRoleValid,checkMailExist,userById} from '../helpers/db-validators.js'


import  {userDelete,
        userGet,
        userPatch,
        userPost,
        userPut
}  from '../controllers/user.js';


const router = Router()

router.get('/',userGet);

router.put('/:id',[
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(userById),
    validateRequest,
],
userPut);

router.post('/',[
    check('name','Name is empty').not().isEmpty(),
    check('mail','Invalid Email').isEmail(),
    check('password','Password must have 6 characters at least').isLength( { min:6 } ),
    //check('role','Is not a valid role').isIn( ['ADMIN_ROLE','USER_ROLE'] ),
    check('role').custom( isRoleValid ),
    check('mail').custom( checkMailExist ),
    validateRequest,
],userPost);

router.delete('/:id',[
    validateJWT,
     //isAdminRole, //check admin role only
    hasRole('ADMIN_ROLE','SALES_ROLE'),
    check('id', 'Is not a valid ID').isMongoId(),
    check('id').custom(userById),
    validateRequest,
],userDelete);

router.patch('/',userPatch);

export {router}