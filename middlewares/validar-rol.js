const Usuario=require('../models/usuario');
const jwt=require('jsonwebtoken');

const validarRol=async(req,res,next)=>{
    if(!req.usuario){ //Esto se pasa a travez del middleware anterior (validar-jwt)
        return res.status(500).send({msg:'Se quiere verificar el role sin validar el token primero'});
    }
    const {rol ,nombre}=req.usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).send({msg:`El usuario ${nombre} no tiene acceso`});
    }

    next();
}

module.exports={
    validarRol
}