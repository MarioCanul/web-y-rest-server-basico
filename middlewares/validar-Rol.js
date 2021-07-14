const {request,response}=require('express')
const esAdminRole=(req=request,res=response,next)=>{

    if (!req.usuarioVerificado) {
        return res.status(500).json({
            msn:'SE REQUIERE VALIDAR EL TOKEN PRIMERO'
        })
    }
const {nombre,rol}= req.usuarioVerificado;

if (rol!=='ADMIN_ROL') {
    return res.status(401).json({
        msn:`no tiene permisos el usuario ${nombre}`
    })
}
    next()
}

const tieneRol =(...roles)=>{

    return (req,res=response,next)=>{

        if (!req.usuarioVerificado) {
            return res.status(500).json({
                msn:'SE REQUIERE VALIDAR EL TOKEN PRIMERO'
            })
        }
        if (!roles.includes(req.usuarioVerificado.rol)) {
            return res.status(401).json({
                msn:`el usuario ${req.usuarioVerificado.nombre} no tiene los permisos`
            })
        }
        
        next()
    }
}
module.exports={
    esAdminRole,
    tieneRol,
}