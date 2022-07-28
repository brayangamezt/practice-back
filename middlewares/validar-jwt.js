const jwt=require('jsonwebtoken');
const Usuario=require('../models/usuario');

const validarJWT=async(req,res,next)=>{
    const token=req.header('x-token');
    if(!token){
        return res.status(401).send({msg:'No hay token en la peticion'}); //En caso de que no exista el token
    }

    //Validar JWT
    try {

        jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Obtener el UID del usuario
        const payload=jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log(payload.uid);

        const {uid}=jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //Leer el usuario al que corresponde el UID
        const usuario=await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).send({msg:'Token no valido-usuario no existe DB'});
        }

        //Verificar si el usuario tiene estado TRUE
        if(!usuario.estado){
            res.status(401).send({msg:'Usuario no encontrado, estado false'});
        }

        req.usuario=usuario; //Se colocar REQ.USUARIO para que se pueda acceder a este valor desde los otros REQ de controladores o REQ de la misma ruta
        next();

    } catch (error) {
        console.log(error);
        res.status(401).send({msg:'token no valido'});
    }
}

module.exports={
    validarJWT
}