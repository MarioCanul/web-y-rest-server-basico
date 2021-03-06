const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es obligatorio']
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatorio']
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:true,
        default:'USER_ROL',
        enum:['ADMIN_ROL','USER_ROL','VENTAS_ROL']
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    },
})

//quitar parametros en la respuesta de un POST o cunado se pida el objeto por .toJSON
UsuarioSchema.methods.toJSON=function () {
    const {__v,password,_id,...usuario}=this.toObject();
   usuario.uid=_id;
    return usuario;
}

module.exports=model('Usuario',UsuarioSchema);