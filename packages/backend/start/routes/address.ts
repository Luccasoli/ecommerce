import Route from '@ioc:Adonis/Core/Route'

Route.get('/address', 'AddressController.index').middleware('auth')

Route.post('/address/add', 'AddressController.create').middleware('auth')

Route.patch('/address/update', 'AddressController.update').middleware('auth')

Route.patch('/address/select', 'AddressController.select').middleware('auth')
