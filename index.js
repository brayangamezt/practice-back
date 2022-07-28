const mongoose=require('mongoose');
const app=require('./app');
const color=require('colors');
require('dotenv').config();//Para establecer variables de entorno



const conexionDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECT);
        app.listen(process.env.PORT,()=>{console.log(color.blue('Aplicacion corriendo en el puerto: ') + color.grey(`${process.env.PORT}`))})
    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    }
}

conexionDB();

