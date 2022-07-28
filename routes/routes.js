const express=require('express');
const { check } = require('express-validator');
const Route=express.Router();
const controller=require('../controllers/controllers');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validator');

//MIDDLEWARES
const { validarCampos } = require('../middlewares/validaciones');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRol } = require('../middlewares/validar-rol');


Route.get('/', controller.home);
Route.get('/getProject/:id', controller.getProject);
Route.post('/save',[
    check('nombre','El nombre es obligatorio').not().isEmpty(), //No debe de estar vacio
    check('correo','El correo no es valido').isEmail(),//Comprobar si es un correo
    check('correo').custom((correo)=>existeEmail(correo)), //Esto es para saber si existe el correo en la tabla de la base de datos
    check('password','La contraseña debe tener mas de 6 letras').isLength({min:6}),
    check('rol').custom((rol)=>esRolValido(rol)),//Esto es un middleware para checar si existe el rol en la tabla de la base de datos
    //check('rol','no es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
    ], controller.save);
Route.put('/update/:id',[
    check('id', 'No es un id valido').isMongoId(), //Esto es para saber si es un ID de mongo
    //check('id').custom((id)=>{existeUsuarioPorId(id)}),
    check('rol').custom((rol)=>esRolValido(rol)),
    validarCampos
    ],controller.update);
Route.delete('/delete/:id',[
    validarJWT,
    validarRol,
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
], controller.delete);
Route.get('/auth', controller.auth);
Route.post('/auth/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], controller.login);

module.exports=Route;