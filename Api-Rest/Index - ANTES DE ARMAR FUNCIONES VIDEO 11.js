'use strict'

const express = require('express') // Importa express de la carpeta node_module a la constante express
const bodyParser = require('body-parser') //Analiza las capas de peticiones
const mongoose = require('mongoose') //IMPORTACION DE LIBRERIA MONGOOSE

const Product = require('./modules/product') //USO MODELO PRODUCT.JS SE INDICA LA RUTA

const app = express() //variable que llama a express
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false})) // Middleware
app.use(bodyParser.json()) // Admite peticiones con formato json

app.get('/api/product', (req, res) => { //METODO GET PETICION Y RESPUESTA /api/product ES EL END POINT
 
 Product.find({}, (err, products) => {
    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`}) //MENSAJE DE ERROR SI EXISTIERA
    if (!products) return res.status(404).send({message: `El producto no existe`}) //MENSAJE DE ERROR NO EXISTE PRODUCTO

    res.status(200).send({ products: products }) //RESPUESTA CORRECTA 200
 })
})

app.get('/api/product/:productId', (req,res) => { //GUARDA EL ID DEL PRODUCTO EN UNA VARIABLE
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {  //FUNCION QUE BUSQUE EL ID
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`}) //MENSAJE DE ERROR SI EXISTIERA
        if (!product) return res.status(404).send({message: `El producto no existe`}) //MENSAJE DE ERROR NO EXISTE PRODUCTO

        res.status(200).send({ product }) //MENSAJE OK PRODUCTO
    }) 
})

app.post('/api/product', (req,res) => {  //MISMA RUTA DEL GET PERO CON VERBO POST
 console.log('Post/ api/product') //CREACION DE ESQUEMA
 console.log(req.body)

 let product = new Product()
 product.name = req.body.name
 product.picture = req.body.picture
 product.price = req.body.price
 product.category = req.body.category
 product.description = req.body.description
 
 product.save((err, productStored) => { //GRABADO EN LA BASE DE DATOS
     if (err) res.status(500).send({message: `Error al salvar en la base de datos:  ${err} `})
     res.status(200).send({product: productStored})
 })
})

app.put('/api/product/:productId', (req,res) => { //METODO PUT PARA ACTUALIZAR PRODUCT ID
    let productId = req.params.productId
    let update = req.body //PARAMETROS A MODIFICAR TOMADOS DEL BODY A VARIABLE update

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

        res.status(200).send({ product: productUpdated})
    })
})

app.delete('/api/product/:productId', (req,res) => { //METODO DELETE PARA BORRAR DATO 
    let productId = req.params.productId //OBTENCION DEL ID DEL OBJETO params

    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
        
        product.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
            res.status(200).send({message: 'El producto ha sido eliminado' })
        })
    })


})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => { //FUNCION DE CALL-BACK A LA BASE DE DATOS CON MONGOOSE
    if (err) {
        return console.log(`Error al conectar al a badse de datos: ${err}`)
    }
    console.log('Conexion a la base de datos establecida...')

    app.listen(port, () => { //function se puede sustituir por  =>
        console.log(`API REST corriendo en http://localhost:${port}`) // usa variable port en lugar del numero del puerto
    })

})



