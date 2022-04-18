import Route from '@ioc:Adonis/Core/Route'

Route.get('/me', 'AuthController.index').middleware('auth')

Route.post('/register', 'AuthController.create')

Route.post('/login', 'AuthController.login')
