import Factory from '@ioc:Adonis/Lucid/Factory'
import Product from 'App/Models/Product'
import ProductCategory from 'App/Models/ProductCategory'
import ProductImage from 'App/Models/ProductImage'
import User from 'App/Models/User'
import UserAddress from 'App/Models/UserAddress'
import UserCreditCard from 'App/Models/UserCreditCard'

export const ProductImageFactory = Factory.define(ProductImage, async ({ faker }) => {
  const name = faker.commerce.department()

  return {
    imageAlt: name,
    imageUrl: faker.image.imageUrl(),
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
  }
})
  .relation('images', () => ProductImageFactory)
  .build()

export const ProductCategoryFactory = Factory.define(ProductCategory, ({ faker }) => {
  const name = faker.commerce.department()

  return {
    imageAlt: name,
    imageUrl: faker.image.imageUrl(),
    name: name,
    category: faker.commerce.department(),
  }
})
  .relation('products', () => ProductFactory)
  .build()

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    CPF: faker.random
      .number({
        max: 99999999999,
        min: 1000000000,
      })
      .toString(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.phoneNumber(),
    birthday: faker.date.past(),
  }
})
  .relation('addresses', () => AddressFactory)
  .relation('creditCards', () => CreditCardFactory)
  .build()

export const AddressFactory = Factory.define(UserAddress, ({ faker }) => {
  return {
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    postalCode: faker.address.zipCode(),
    country: faker.address.country(),
    neighborhood: faker.address.city(),
    number: faker.random.number({ min: 1, max: 999 }).toString(),
  }
}).build()

export const CreditCardFactory = Factory.define(UserCreditCard, ({ faker }) => {
  return {
    cvv: faker.random.number({ min: 100, max: 999 }).toString(),
    number: faker.random.number({ min: 1000000000000000, max: 9999999999999999 }).toString(),
    expirationDate: faker.date.future(),
    name: ['Mastercard', 'Visa', 'American Express'][Math.floor(Math.random() * 3)],
  }
}).build()
