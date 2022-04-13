import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ProductCategorieFactory } from 'Database/factories'

export default class InitialSeed extends BaseSeeder {
  public async run() {
    // create a few product categories with products and it images
    await ProductCategorieFactory.with('products', 8, (product) =>
      product.with('images', 5)
    ).createMany(10)
  }
}
