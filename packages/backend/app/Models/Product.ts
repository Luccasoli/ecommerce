import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import ProductImage from './ProductImage'
import ProductCategory from './ProductCategory'
import User from './User'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public selling_price: number

  @column()
  public cost_price: number

  @column()
  public image_url: string

  @column()
  public image_alt: string

  @hasMany(() => ProductImage)
  public images: HasMany<typeof ProductImage>

  @belongsTo(() => ProductCategory)
  public category: BelongsTo<typeof ProductCategory>

  @manyToMany(() => User)
  public savedByUser: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
