require('dotenv').config()

const express = require('express')
const {models} = require('./src/libs/sequelize')

const bodyParser = require('body-parser'); //ESTO ES NUEVO

const productsRouter = require('./src/routers/productsRouter')
const authRouter = require('./src/routers/authRouter')
const usersRouter = require('./src/routers/usersRouter')
const categoriesRouter = require('./src/routers/categoriesRouter')
const ordersRouter = require('./src/routers/ordersRouter')
const productsService = require('./src/services/productsService')
const service = require('./src/services/ordersService')
const path = require('path');

const app = express()

const PORT = process.env.PORT

// app.use(express.static( 'public' ))
app.use(express.static(path.join(__dirname, './public')));

app.set( 'views', './src/views/' )
app.set( 'view engine', 'ejs' )

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'ingenieria informatica' }));

require('./src/config/passport')(app)

app.get('/indexUsers', async (req, res) => {
    const products = await models.product.findAll()
    const query = req.query.query;

    if (!query) {
        // No se proporcionó un valor para el parámetro 'query', mostrar todos los elementos
        return res.render('indexUsers', {
            user: req.user,
            products: products
        });
      }
    const filteredProducts = products.filter(products => products.product_name.includes(query));
    res.render('indexUsers',{
        user: req.user,
        products: filteredProducts
    })
})
app.get('/indexAdmin', (req,res)=>{
    res.render('indexAdmin',{
    })
})

app.get('/errorValidation', (req,res)=>{
    res.render('errorValidation',{
    })
})


app.get('/formOrder', async (req, res) => {
    const product_id = req.query.product_id;
    const product_name = req.query.product_name;
    const product_price = req.query.product_price;

    res.render('formOrder', {
      product_id: product_id,
      product_name: product_name,
      product_price: product_price
    });
  });
  

app.use('/admin/products', productsRouter)
app.use('/admin/users', usersRouter)
app.use('/admin/categories', categoriesRouter)
app.use('/admin/orders', ordersRouter)
app.use('/auth', authRouter)

app.listen(PORT, ()=> {
    console.log(`${process.env.APP_NAME} is running 
    on port: ${PORT}`)
})