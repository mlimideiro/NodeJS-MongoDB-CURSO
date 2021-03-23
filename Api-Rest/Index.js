'use strict'

const mongoose = require('mongoose') //IMPORTACION DE LIBRERIA MONGOOSE
const app = require('./app')
const config = require('./config') //LLAMA A CONFIG PARA VER EL PUERTO
  
mongoose.connect(config.db, (err, res) => { //FUNCION DE CALL-BACK A LA BASE DE DATOS CON MONGOOSE
    if (err) {
        return console.log(`Error al conectar la base de datos: ${err}`)
    }
    console.log('Conexion a la base de datos establecida...')

    app.listen(config.port, () => { //function se puede sustituir por  =>
        console.log(`API REST corriendo en http://localhost:${config.port}`) // usa variable port en lugar del numero del puerto
    })
})



