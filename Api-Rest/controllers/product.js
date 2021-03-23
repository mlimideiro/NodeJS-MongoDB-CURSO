'use strict' 

const Product = require('../modules/product') //USO MODELO PRODUCT.JS SE INDICA LA RUTA

function getProduct (req, res) { // FUNCION get product por ID
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {  //FUNCION QUE BUSQUE EL ID
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`}) //MENSAJE DE ERROR SI EXISTIERA
        if (!product) return res.status(404).send({message: `El producto no existe`}) //MENSAJE DE ERROR NO EXISTE PRODUCTO

        res.status(200).send({ product }) //MENSAJE OK PRODUCTO
    }) 
}

function getProducts (req, res) {  // FUNCION get product
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`}) //MENSAJE DE ERROR SI EXISTIERA
        if (!products) return res.status(404).send({message: `El producto no existe`}) //MENSAJE DE ERROR NO EXISTE PRODUCTO
    
        res.status(200).send({ products: products }) //RESPUESTA CORRECTA 200
     })
}

function saveProduct (req, res) {
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
}

function updateProduct (req, res) {
    let productId = req.params.productId
    let update = req.body //PARAMETROS A MODIFICAR TOMADOS DEL BODY A VARIABLE update

    Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
        if (err) res.status(500).send({message: `Error al actualizar el producto: ${err}`})

        res.status(200).send({ product: productUpdated})
    })
}

function deleteProduct (req, res ) {
    let productId = req.params.productId //OBTENCION DEL ID DEL OBJETO params

    Product.findById(productId, (err, product) => {
        if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
        
        product.remove(err => {
            if (err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
            res.status(200).send({message: 'El producto ha sido eliminado' })
        })
    })


}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}
