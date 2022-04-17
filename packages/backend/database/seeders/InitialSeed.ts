import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ProductCategoryFactory } from 'Database/factories'

export default class InitialSeed extends BaseSeeder {
  public async run() {
    await ProductCategoryFactory.with('products', 8, (product) =>
      product.with('images', 5)
    ).createMany(10)
  }
}
