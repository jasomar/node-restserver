import mongoose,{Schema,model} from 'mongoose';

const RoleSchema =  new Schema({
    role:{
        type:String,
        require:[true, 'Role is required']
    }
});
const RoleDB = mongoose.model('roles',RoleSchema); // create collection "table" and schema

export{RoleDB} 