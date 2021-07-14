const JWT = require('jsonwebtoken')

const generarJWT=(uid='')=>{

    return new Promise((resolve,reject)=>{
       //los datos que genera el jWT con info del usuario
        const payload={uid};
        JWT.sign(payload,process.env.PRIVATEJWT,{
           expiresIn:'4h' 
        },(error,token)=>{
            if (error) {
                console.log(error);
                reject('NO se pudo generar el JWT')
            }else{
                resolve(token)
            }
        })

    })
};
module.exports={
    generarJWT
}