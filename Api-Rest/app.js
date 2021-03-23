'use strict'


const express = require('express') // Importa express de la carpeta node_module a la constante express
const bodyParser = require('body-parser') //Analiza las capas de peticiones
const hbs = require('express-handlebars') //IMPORTA LIBRERIA HANDLEBARS
const app = express() //variable que llama a express
const api = require('./routes')

app.use(bodyParser.urlencoded({ extended: false})) // Middleware
app.use(bodyParser.json()) // Admite peticiones con formato json

//CONFIGURACION DE MOTOR DE PLANTILLAS
app.engine('.hbs', hbs({
    defaultLayout: 'default',
    extname: 'hbs' //DEFINE EXTENSION POR DEFECTO 
}))
app.set('view engine', '.hbs')

app.use('/api', api)
app.get('./login', (req, res) => { //DEFINE QUE PARA /login MANDE FUNCION DE RENDER
    res.render('login')
})
 
module.exports = app