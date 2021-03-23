'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth') //IMPORTACION DEL MIDDLEWARE AUTH
const api = express.Router()

api.get('/product', productCtrl.getProducts)      //METODO GET PETICION Y RESPUESTA 
                                        // /api/product ES EL END POINT
                                        // LLAMA A FUNCION
api.get('/product/:productId', productCtrl.getProduct) //GUARDA EL ID DEL PRODUCTO EN UNA VARIABLE
api.post('/product', productCtrl.getProduct)   //MISMA RUTA DEL GET PERO CON VERBO POST
api.put('/product/:productId', productCtrl.getProduct)  //METODO PUT PARA ACTUALIZAR PRODUCT ID
api.delete('/product/:productId', productCtrl.getProduct)  //METODO DELETE PARA BORRAR DATO 
api.post('signup', userCtrl.signUp)
api.post('signin', userCtrl.signIn)
api.get('/private', auth,  (req, res) => { //RUTA 
    res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api