import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { randImg, randProductCategory } from '@ngneat/falso'
import ProductCategory from 'App/Models/ProductCategory'

export default class ProductCategorySeeder extends BaseSeeder {
  public async run() {
    await ProductCategory.createMany([
      ...Array(10)
        .fill(null)
        .map(() => {
          const name = randProductCategory()

          return {
            name,
            description: '',
            image_alt: randImg(),
            image_url: name,
          }
        }),
    ])
  }
}
