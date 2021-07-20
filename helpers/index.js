const dbValidator = require('./DB-validators');
const googleVerify= require('./google-verify');
const generarJWT = require('.generarJWT/');
const SubirArchivo= require('./subir-archivo');

module.exports={
    ...dbValidator,
    ...googleVerify,
    ...generarJWT,
    ...SubirArchivo,

}