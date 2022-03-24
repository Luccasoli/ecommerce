import Route from '@ioc:Adonis/Core/Route'

Route.get('/me', async () => {
  return { name: 'Adonis' }
})

Route.post('/register', async () => {
  return { name: 'Adonis' }
})

Route.post('/login', async () => {
  return { name: 'Adonis' }
})
