module.exports = {
    port: process.env.PORT || 3001, //EXPORTACION DE PUERTO A 3001
    db: process.env.MONGODB || 'mongodb://localhost:27017/shop', //EXPORT. DE BASE DE DATOS
    SECRET_TOKEN: 'miclavedetoken'
}