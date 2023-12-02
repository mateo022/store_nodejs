function validatorHandler(schema, property){
    return(req, res, next) =>{
        const data = req[property]
        const {error} = schema.validate(data)
        if (error) {
            // res.redirect(req.session.returnTo)
            console.log(error.message)
            res.status(400).json({ error: 'Bad Request' }); // Enviar una respuesta de error al cliente
        }else{
            next()
        }
    }
}

module.exports = { validatorHandler }