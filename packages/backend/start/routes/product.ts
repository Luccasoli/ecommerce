import Route from '@ioc:Adonis/Core/Route'

Route.get('/products', async () => {
  return [{ name: 'Adonis' }]
})

Route.get('/product/:productId', async ({ params }) => {
  return { name: 'Product', productId: params.productId }
})
