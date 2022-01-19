import faker from '@faker-js/faker'
import path from 'path'
import fs from 'fs'
const PRODUCTS_AMOUNT = 50

const products = Array.from({ length: PRODUCTS_AMOUNT }).map(() => ({
	id: faker.datatype.uuid(),
	name: faker.commerce.productName(),
	price: faker.commerce.price(),
	image: faker.image.fashion(640, 480, true),
	description: faker.lorem.paragraph(),
}))

// write to file
fs.writeFileSync(
	path.resolve('.', 'products.json'),
	JSON.stringify({ products })
)
