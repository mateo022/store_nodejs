const passport = require('passport')
const LocalStrategy = require('passport-local')
const sql = require('../../../db')

async function getUserByUsername( username ) {
    const user = await 
    sql`SELECT id_user, name, username, password FROM users
        WHERE username = ${username}
    ;`
    return user[0]
}

passport.use(new LocalStrategy(
    async function (username, password, done) {
        //1. Consultar en BD el usuario
        const user = await getUserByUsername(username)
        console.log(user)
        //2. Comparar la contraseña
        if(user && user.password == password){
            //3. Decidir si queda logueado o no
            //SI
            return done(null, user)
        }
        //NO
        return done(null, false)
    }
));