import Route from '@ioc:Adonis/Core/Route'

Route.resource('/products', 'ProductsController').only(['index', 'show'])
