const {models} = require('../libs/sequelize')

//Obtener todas las sesiones de la BD
async function index(){
    const products = await models.product.findAll({
        include : [
            {
            model: models.category,
            as: 'category', //Esto es nuevo
            }
        ],
        
    })
    return products
}

//Obtener una sesion de la BD
async function show( product_id ){
    const product = await models.product.findByPk(product_id)
    console.log(product)
    return product
}


async function store( data, category_id ){
  const product = await models.product.create(data, {
    include : [
        {
        model: models.category,
        as: 'category', //Esto es nuevo
        }
    ],
  })
  if (category_id) {
    const category = await models.category.findByPk(category_id);
    if (category) {
      await product.setCategory(category);
    }
  }
  return product
}

//Actualizar un registro
async function update ( id, data, imageFilename, category_id ){
    const product = await show(id)
    if (imageFilename) {
        data.product_image = imageFilename;
      }
    product.update(data)
    include : [
      {
      model: models.category,
      as: 'category', //Esto es nuevo
      }
  ]
if (category_id) {
  const category = await models.category.findByPk(category_id);
  if (category) {
    await product.setCategory(category);
  }
}
    return product
}

//Eliminar un registro de BD
async function destroy ( id ){
    const product = await show(id)
    await product.destroy()
    return product
}


module.exports = {
    index,
    show,
    store,
    update,
    destroy
}