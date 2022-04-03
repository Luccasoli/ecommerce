import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { randImg, randProductDescription, randProductName } from '@ngneat/falso'
import Product from 'App/Models/Product'

export default class ProductSeeder extends BaseSeeder {
  public async run() {
    await Product.createMany([
      ...Array(30)
        .fill(null)
        .map(() => {
          const costPrice = Math.floor(Math.random() * 10000)
          const name = randProductName()

          return {
            name,
            description: randProductDescription(),
            cost_price: costPrice,
            selling_price: Math.floor(costPrice * (Math.random() + 1)),
            image_alt: randImg(),
            image_url: name,
          }
        }),
    ])
  }
}
