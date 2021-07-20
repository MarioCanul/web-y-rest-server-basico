const { v4: uuidv4 } = require("uuid");
const path = require("path");
const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    
if (!files) {
    return reject(
        `No hay archivo que subir`
      );
}
const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];
    //validar la extension

    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extension ${extension} no es Permitida, ${extensionesValidas}`
      );
    }

    const nombreTemp = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};
module.exports={
    subirArchivo
}