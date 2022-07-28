const Role=require('../models/roles');
const Usuarios=require('../models/usuario');

const esRolValido=async(rol='')=>{ //Comprobar si dentro de la tabla de la base de datos, existe el rol
    const existeRol=await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El roll ${rol} no esta registrado en la base de datos`);
    }
}

const existeEmail=async(correo='')=>{ //Comprobar dentro de la cabla de la base de datos, si el correo existe
    const correoExistente=await Usuarios.findOne({correo});
    if(correoExistente){
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId=async(id='')=>{
    //Verificar si el ID del usuario existe
    const existeUsuario=await Usuarios.findById(id);
    if(!existeUsuario){
        throw new Error(`El ${id} no esta registrado`);
    }
}


module.exports={esRolValido, existeEmail, existeUsuarioPorId}