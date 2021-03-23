'use strict'

const User = require('../modules/user') 
const service = require('../service')

//FUNCION PAR AEL REGISTRO
function signUp (req,res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,

    })

    user.save((err) => {
        if (err) res.status(500).send({ message: `Error al crear el usuario: ${err}`})

        return res.status(200).send({ token: ServiceUIFrameContext.createToken(user) }) //ENVIA PARAMETRO TOKEN . MODULO APARTE QUE 
                                                                                        //ES SERVICE
    })
}

//FUNCION USUARIO Y REGISTRADO
function signIn (req, res) {
    User.find({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ message: err}) // SI ERROR DEVUELVE EL ERROR
        if (!user) return res.status(404).send({ message: 'No existe el usuario'}) // SI NO EXISTE EL OBJETO USER DEVUELVE ERROR
        
        // USUARIO CORRECTAMENTE LOGUEADO
        req.user = user //REQUEST QUE GUARDA OBJETRO USER EN user
        res.status(200).send({ //DEVUELVE RESPUESTA CODIGO 200
            message: 'Te has logueado correctamente',
            token: service.createToken(user) //ENVIA TOKEN AL CLIENTE
        })
    })
}

module.exports = {
    signUp,
    signIn
}
