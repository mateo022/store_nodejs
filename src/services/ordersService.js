const {models} = require('../libs/sequelize')

//Obtener todas las sesiones de la BD
async function index(){
    const orders = await models.order.findAll({
        include : [
            {
            model: models.product,
            as: 'product', //Esto es nuevo
            }
        ],
        
    })
    return orders
}

//Obtener una sesion de la BD
async function show( order_id ){
    const order = await models.order.findByPk(order_id)
    console.log(order)
    return order
}


async function store( data, product_id ){
  const order = await models.order.create(data, {
    include : [
        {
        model: models.product,
        as: 'product', //Esto es nuevo
        }
    ],
  })
  if (product_id) {
    const product = await models.product.findByPk(product_id);
    if (product) {
      await order.setProduct(product);
    }
  }
  return order
}

//Actualizar un registro
async function update ( id, data ){
    const order = await show(id)
    order.update(data)
    return order
}

//Eliminar un registro de BD
async function destroy ( id ){
    const order = await show(id)
    await order.destroy()
    return order
}


module.exports = {
    index,
    show,
    store,
    update,
    destroy
}