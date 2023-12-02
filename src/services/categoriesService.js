const { models } = require('../libs/sequelize')

//Obtener todas las sesiones de la BD
async function index(){
    //Obtener listado de sesiones
    // const sessions = await sql`SELECT id_session, session_name, session_description, session_date
    // FROM sessions;`
    // console.log(sessions)
    // const [sessions, metadata] = await sequelize.query('SELECT id_session, session_name, session_description, session_date FROM sessions;')
    // console.log(metadata)
    const categories = await models.category.findAll()
    return categories
}

//Obtener una sesion de la BD
async function show( id ){
    // const session = await sql`SELECT id_session, session_name, session_description, session_date
    // FROM sessions
    // WHERE id_session = ${id_session};`
    const category = await models.category.findByPk(id)
    console.log(category)
    return category
}

//Almacenar un nuevo registro
async function store( data ){
    // const response = await sql`
    // INSERT INTO sessions(session_name, session_description, session_date)
    // VALUES (${session.session_name}, ${session.session_description}, ${session.session_date});`
    const category = await models.category.create(data)
    return category
}

//Actualizar un registro
async function update ( id, data ){
    // const response = await sql`
    // UPDATE sessions SET
    // session_name =${session.session_name}, 
    // session_description = ${session.session_description}, 
    // session_date = ${session.session_date}
    // WHERE id_session = ${session.id_session};`
    const category = await show(id)
    category.update(data)
    return category
}

//Eliminar un registro de BD
async function destroy ( id ){
    const category = await show(id)
    await category.destroy()
    return category
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}