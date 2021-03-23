'use strict'

const services = require('../service')

function isAuth (req,res, next) {
    if (!req.headers.authorization) { //COMPRUEBA QUE EN EL HEADER HAY UN CAMBIO LLAMADO authorization
        return res.status(403).send({ message: 'No tienes autorizacion'}) //NO EXISTE 
    }
    const token = req.headers.authorization.split(' ')[1]//SEPARA LA CABECERA Y HACE UN ARRAY 
    
    services.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
            res.status(response.status)
        })
}

module.exports = isAuth