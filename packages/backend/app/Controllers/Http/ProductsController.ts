import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProductsController {
  public async index() {
    return [{ name: 'Adonis' }]
  }

  public async show({ params }: HttpContextContract) {
    return { name: 'Product', productId: params.productId }
  }
}
