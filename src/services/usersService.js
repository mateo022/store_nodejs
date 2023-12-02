const {models} = require('../libs/sequelize')

//Obtener todas las sesiones de la BD
async function index(){
    const users = await models.user.findAll()
    return users
}

//Obtener una sesion de la BD
async function show( id ){
    const user = await models.user.findByPk(id)
    console.log(user)
    return user
}

//Almacenar un nuevo registro
async function store( data ){
    const user = await models.user.create(data)
    return user
}

//Actualizar un registro
async function update ( id, data ){
    const user = await show(id)
    user.update(data)
    return user
}

//Eliminar un registro de BD
async function destroy ( id ){
    const user = await show(id)
    await user.destroy()
    return user
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}