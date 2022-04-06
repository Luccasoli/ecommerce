import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ProductCategorieFactory } from 'Database/factories'

export default class ProductCategorySeeder extends BaseSeeder {
  public async run() {
    await ProductCategorieFactory.createMany(10)
  }
}
