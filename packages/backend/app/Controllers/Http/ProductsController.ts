import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index(ctx: HttpContextContract) {
    const { limit, page } = ctx.request.params() as {
      limit?: number
      page?: number
    }

    const payload = await Product.query().paginate(page || 1, limit || 20)

    return ctx.response.status(200).json({
      message: 'List of products',
      payload,
    })
  }

  public async show({ params }: HttpContextContract) {
    return Product.findOrFail(params.id)
  }
}
