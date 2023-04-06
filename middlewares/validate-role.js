import { response, request } from'express';

const isAdminRole = (req = request, res = response, next) =>{
    if (!req.user) {
        return res.status(500).json({
            msg: 'token needs to be valided before validate role'
        });
    }
    const {role,name} = req.user;
    if(role !=="ADMIN_ROLE"){
        return res.status(401).json({
            msg: `${name} is not admin`
        })
    }
    next();
}
const hasRole = (...roles) =>{
    return (req = request, res = response, next) => {
        const {role} = req.user;
        if(!roles.includes(role)){
            return res.status(401).json({
                msg: `Services required roles: ${roles}`
            })
        }
        next();
    }
}

export {isAdminRole,hasRole}