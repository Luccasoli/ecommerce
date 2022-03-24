import Route from '@ioc:Adonis/Core/Route'

Route.post('/payment', async () => {
  return [{ name: 'Adonis' }]
})
