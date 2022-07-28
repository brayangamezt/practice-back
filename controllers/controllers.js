const Usuario=require('../models/usuario');
const bcryptjs=require('bcryptjs');
const { generarJWT } = require('../helpers/generar-JWT');

const controller={

    home:(req,res)=>{
        res.send({message:'Hola mundo desde la home'})
    },

    save:async(req,res)=>{
        //let body=req.body;
        //const usuario=new Usuario(body);
        
        const {nombre,correo,password,rol}=req.body;
        const usuario=new Usuario({nombre, correo,password,rol});


        //Encriptar la contraseña
        const salt=bcryptjs.genSaltSync();
        usuario.password=bcryptjs.hashSync(password, salt);

        //Guardar en base de datos
        usuario.save();

        res.status(200).send({usuario});
    },

    getProject:async(req,res)=>{
        const {id}=req.params;

        const respuesta=await Usuario.findById(id);
        res.status(200).send({respuesta});
        
    },

    update:async(req,res)=>{ //Con este metodo vamos a actualizar
        const {id}=req.params;
        const {password, google, correo, ...resto}=req.body;

        //validar contra base de datos
        if(password){
            //encriptar contraseña
            const salt=bcryptjs.genSaltSync();
            resto.password=bcryptjs.hashSync(password, salt);
        }

        const usuarioDB=await Usuario.findByIdAndUpdate(id,resto,{new:true});
        res.status(200).send({usuarioDB})
    },

    delete:async(req,res)=>{
        const {id}=req.params;

        //Fisicamente lo borramos
        //const usuario=await Usuario.findByIdAndDelete(id);

        //cambiar estado del usuario
        const usuario= await Usuario.findByIdAndUpdate(id, {estado:false});

        //usuario autentificado
        const usuarioAutenticado=req.usuario;//Esto viene desde el middleware 

        res.status(200).send({usuario, usuarioAutenticado});
    },

    auth:async(req,res)=>{
        res.status(200).send({msg:'Hola mundo desde el auth'});
    },

    login:async(req,res)=>{//CONTROLADOR DEL LOGIN

        const {correo,password}=req.body;
        try {
            //VERIFICAR SI EL EMAIL EXISTE
            const usuario=await Usuario.findOne({correo});
            if(!usuario){
                return res.status(400).send({msg:'Usuario/contraseña no son correctos'});
            }

            //SI EL USUARIO ESTA ACTIVO
            if(!usuario.estado){
                return res.status(400).send({msg:'Usuario no reconocido -->Estado: FALSE'});
            }

            //VERIFICAR LA CONTRASEÑA
            const validarPassword=bcryptjs.compareSync(password, usuario.password); //Estoy comparando la contraseña que llega en el body con la que esta guardada en la base de datos, esto regresa un boolean
            if(!validarPassword){
                return res.status(400).send({msg:'Usuario/contraseña no son correctos --> password'});
            }

            //GENERAR EL JWT
            const token=await generarJWT(usuario.id); //Funcion para generar JWT

            res.status(200).send({usuario,token});   
        } catch (error) {
            console.log(error);
            res.status(500).send({msj:'Hable con el administrador'});
        }
    }

    
}

module.exports=controller