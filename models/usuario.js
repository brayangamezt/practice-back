const {Schema, model}=require('mongoose');

//Un modelo son los campos que se van a llenar en nuestra coleccion
//Es el equivalente a los campos que tiene una tabla para llenarse en SQL
const UsuarioSchema=Schema({
    nombre:{type:String, required:[true, 'El nombre es obligatorio por favor']},
    correo:{type:String, required:[true, 'El correo es obligatorio'], unique:true}, //Este mensaje aparecera cuando el correo este vacio
    password:{type:String, required:[true, 'Contraseña es obligatoria']},
    imagen:{type:String,},
    rol:{type:String, required:true, emun:['ADMIN_ROLE', 'USER_ROLE']},
    estado:{type:Boolean, default:true},
    google:{type:Boolean, default:false}
});

UsuarioSchema.methods.toJSON=function(){
    const {__v, password,_id,...usuario}=this.toObject(); //Con esto lo que hago es evitar que muestre la contraseña encriptada al momento de mostrarse la respuesta en postman
    usuario.iud=_id;
    return usuario
}


module.exports=model( 'Usuarios', UsuarioSchema );
//Escribimos usuarios por que es el nombre con el que se va a crear nuestra coleccion(tabla) que aun no a sido creada