import Route from '@ioc:Adonis/Core/Route'

Route.get('/order/:orderId', async ({ params }) => {
  return [{ orderId: params.orderId }]
})

Route.get('/orders', async () => {
  return [{ name: 'Adonis' }]
})
