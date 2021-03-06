import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class UserAddress extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public isSelected: boolean

  @column()
  public identification: string

  @column()
  public address: string

  @column()
  public number: string

  @column()
  public complement: string

  @column()
  public neighborhood: string

  @column()
  public city: string

  @column()
  public state: string

  @column()
  public postalCode: string

  @column()
  public country: string

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
