import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'

export default class ProductsController {
  public async index(ctx: HttpContextContract) {
    const { limit, page } = ctx.request.qs() as {
      limit?: number
      page?: number
    }

    const payload = (await Product.query().paginate(page || 1, limit || 20)).toJSON()

    // filter response
    payload.data = payload.data.map((product) => {
      return {
        ...product.toJSON(),
        price: product.sellingPrice / 100,
        image: product.imageUrl,
      }
    })

    return ctx.response.status(200).json({
      message: 'List of products',
      payload: payload,
    })
  }

  public async show({ params }: HttpContextContract) {
    return Product.findOrFail(params.id)
  }
}
