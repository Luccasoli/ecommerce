import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index() {
    return Product.all()
  }

  public async show({ params }: HttpContextContract) {
    return Product.findOrFail(params.id)
  }
}
