import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import UserAddress from './UserAddress'
import UserCreditCard from './UserCreditCard'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public email: string

  @column()
  public birthday: Date

  @column()
  public CPF: string

  @manyToMany(() => Product)
  public savedProducts: ManyToMany<typeof Product>

  @hasMany(() => UserAddress)
  public addresses: HasMany<typeof UserAddress>

  @hasMany(() => UserCreditCard)
  public creditCards: HasMany<typeof UserCreditCard>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
