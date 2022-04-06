import Factory from '@ioc:Adonis/Lucid/Factory'
import ProductCategory from 'App/Models/ProductCategory'
import Product from 'App/Models/Product'
import ProductImage from 'App/Models/ProductImage'

function randomIntFromInterval(max: number, min: number = 1) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const ProductCategorieFactory = Factory.define(ProductCategory, ({ faker }) => {
  const name = faker.commerce.department()

  return {
    image_alt: name,
    image_url: faker.image.imageUrl(),
    name: name,
    category: faker.commerce.department(),
  }
}).build()

export const ProductFactory = Factory.define(Product, async ({ faker }) => {
  const name = faker.commerce.productName()
  const costPrice = Math.floor(Math.random() * 10000)

  return {
    name,
    description: faker.commerce.productDescription(),
    cost_price: costPrice,
    selling_price: Math.floor(costPrice * (Math.random() + 1)),
    image_alt: name,
    image_url: faker.image.imageUrl(),
    // pick a random category
    category: await ProductCategory.find(randomIntFromInterval(10)),
  }
}).build()

export const ProductImageFactory = Factory.define(ProductImage, async ({ faker }) => {
  const name = faker.commerce.department()

  return {
    image_alt: name,
    image_url: faker.image.imageUrl(),
    product: await ProductCategory.find(randomIntFromInterval(30)),
  }
}).build()
