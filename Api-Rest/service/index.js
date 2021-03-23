'use strict'

//const jwt = require('jwt-simple') //IMPORTA LIBRERIA jwt-simple PARA TOKEN
const jwt = require('jwt-simple') //IMPORTA LIBRERIA jwt-simple PARA TOKEN
const moment = require('moment') //IMPORTA LIBRERIA moment PARA MANEJO DE FECHAS
const config = require('../config')

function createToken (user) { //FUNCION PARA CREAR TOKEN
    const payLoad = {
        sub: user._id,
        iat: moment().unix(), //CREA FECHA DEL TOKEN
        exp: moment().add(14, 'days').unix(), //CALCULA FECHA DE CADUCIDAD DE TOKEN
                                              // EN 14 DIAS
                 //EJEMPLO; exp: moment().add(1, 'year').unix(), PUEDE PONERSE 1 AÑO
    }

    return jwt.encode(payLoad, config.SECRET_TOKEN)

}

function decodeToken (token) { //RECOGE EL TOKEN DECODIFICADO
    const decoded = new Promise ((resolve, reject) => {
        try {
            const payLoad = jwt.decode(token, config.SECRET_TOKEN)

            if (payLoad.exp <= moment().unix()) { //CHEQUEA QUE EL TOKEN NO HAYA EXPIRADO
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            resolve(payLoad.sub) //SI TOKEN ES CORRECTO
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })

    return decoded
}

module.exports = {
    createToken,
    decodeToken
}

