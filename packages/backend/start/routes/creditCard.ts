import Route from '@ioc:Adonis/Core/Route'

Route.get('/credit-card', 'CreditCardController.index').middleware('auth')

Route.post('/credit-card/add', 'CreditCardController.create').middleware('auth')

Route.patch('/credit-card/update', 'CreditCardController.update').middleware('auth')

Route.patch('/credit-card/select', 'CreditCardController.select').middleware('auth')

Route.delete('/credit-card/remove/:id', 'CreditCardController.delete').middleware('auth')
