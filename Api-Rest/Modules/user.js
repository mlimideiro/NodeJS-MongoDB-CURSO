'use strict'

const mongoose = require('mongoose') 
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs') //LIBRERIA PARA ENCRIPTAR CONTRASEÑAS
const crypto = require('crypto')

const UserSchema = new Schema({ //CREACION DE ESQUEMA
 //CAMPOS DEL OBJETO EN LA BASE DE DATOS
 email: {type: String, unique: true, lowercase: true }, //UNICO Y LO PASA A MINUSCULAS
 displayName: String, 
 avatar: String,
 password: { type: String, select: false}, //select:false PARA QUE N O MANDE LA CONTRASEÑA AL HACER UN GET
 signupDate: { type: Date, default: Date.now()}, //CUANDO SE REGISTRA GUARDA LA FECHA DE SINGUP
 lastLogin: Date
})

UserSchema.pre('save', (next) => {
    let user = this 
    if (!user.isModified('password')) return next() //COMPRUEBA SI EL USER NO CAMBIO CONTRASEÑA Y PASA AL SIGUENTE MIDDLEWARE

    bcrypt.genSalt(10, (err, salt) => { 
        if (err) return next() //SI HAY ERROR PASA EL SIGUIENTE MIDDLEWARE
    
        bcrypt.hash(user.password, salt, null, (err, hash) => { 
          if (err) return next(err)

          user.password = hash //CAMBIA EL PASWORD DEL CLIENTE DEL FORMULARIO AL NUEVO HASH
          next()
        })
    })
})
//GRAVATAR ES UN WEB QUE CONTIENE PERFILES
//ESTE METODO BUSCA EL PERFIL DEL USUARIO EN GRAVATAR
UserSchema.methods.gravatar = function () {
    if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro` //SI NO TIENE MAIL REGSITRADO EN GRAVATAR, DEVUELVE UNO POR DEFECTO
                                                                         // GRAVATAR DE TIPO RETRO

    const md5 = crypto.createHash('md5').update(this.email).digest('hex') //CREA A PARTIR DEL MAIL DEL USUARIO
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema) //EXPORTA EL MODELO


