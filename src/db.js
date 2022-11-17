import mongoose from 'mongoose';

const { USER_MONGODB, PASSWORD_MONGODB, NAME_MONGODB_DATABASE } = process.env;



const conexionDB = async () => {
    const MONGODB_URI = `mongodb+srv:/${USER_MONGODB}:${PASSWORD_MONGODB}@veterinary.lwmg6ag.mongodb.net/${NAME_MONGODB_DATABASE}?retryWrites=true&w=majority`;
    try {
        const DB = await mongoose.connect(MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true})
        console.trace("Conexion establecida", DB.conecion.name);
        
    } catch (error) {
        console.trace('Ocurrio un error al tratar de conectarse a la base de datos:', error )
    }
}

module.exports = conexionDB