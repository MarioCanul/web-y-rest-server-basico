const mongoose = require('mongoose');
const dbConnection = async()=>{
try {
    await await mongoose.connect(process.env.MONGO_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      console.log('BD connected')
} catch (error) {
    console.log(error)
    throw new Error('algo salio mal')
}

}
module.exports={
    dbConnection
};