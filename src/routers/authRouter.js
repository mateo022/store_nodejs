const express = require('express')
const passport = require('passport')
const authRouter = express.Router()
const usersService = require('../services/usersService.js')


authRouter.route('/signIn')
.get((req, res)=>{
    res.render('auth/signIn')
})
.post(
    passport.authenticate('local',{
        successReturnToOrRedirect: '/indexUsers',
        failureRedirect: '/errorValidation',
        keepSessionInfo: true
    })
)

authRouter.route('/signUp')
.get((req, res)=>{
    res.render('auth/signUp')
})
.post((req, res)=> {
    console.log(req.body)
    const user = usersService.store( req.body ) //Almacenamos en BD
    req.login(user, (err) => {
        if (err) {
            return next(err);
        }
    res.redirect('/indexUsers')
    })
})

authRouter.route('/indexAdmin').get((req,res) => {
    // res.json(req.user)
    res.render('/')
})
authRouter.route('/indexUsers').get((req,res) => {
    // res.json(req.user)
    res.render('/')
})

authRouter.route('/signOut')
  .get((req, res) => {
    req.logout((err) => {
        if (err){
            return next(err)
        }
        res.render('auth/signOut'); // Renderizar la vista de cierre de sesión
    });
  });


module.exports = authRouter