import mongoose from 'mongoose';

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('online')
    } catch (e) {
        console.log(e);
        throw new Error('Error to init database');
    }
}

export {
    dbConnection
}