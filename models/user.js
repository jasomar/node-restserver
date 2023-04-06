import mongoose,{Schema,model} from 'mongoose';

const UserSchema = new Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    mail:{
        type:String,
        required:[true, 'Mail is required'],
        unique: true
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    },
    img:{
        type:String,
    },
    role:{
        type: String,
        default: 'USER_ROLE'
    },
    state:{
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

//remove propeties after insert it
UserSchema.methods.toJSON = function(){
    const {password, __v,_id,...user} = this.toObject();
    // can host any name
    user.uid = _id;
    return user;
}

const UserDB = mongoose.model('User', UserSchema); // create collection "table" and schema


export{
    UserDB
}