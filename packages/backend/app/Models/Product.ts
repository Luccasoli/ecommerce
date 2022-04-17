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
  public sellingPrice: number

  @column()
  public costPrice: number

  @column()
  public imageUrl: string

  @column()
  public imageAlt: string

  @hasMany(() => ProductImage)
  public images: HasMany<typeof ProductImage>

  @column()
  public productCategoryId: number

  @belongsTo(() => ProductCategory)
  public category: BelongsTo<typeof ProductCategory>

  @manyToMany(() => User)
  public savedByUser: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
