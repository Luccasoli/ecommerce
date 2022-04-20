import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import UserAddress from '../../Models/UserAddress'
import UserCreditCard from '../../Models/UserCreditCard'

type CreditCardData = {
  name: string
  number: string
  expirationDate: Date
  cvv: string
  isActive?: boolean
}

const getUser = async (ctx: HttpContextContract) => {
  const user = await User.query()
    .join('auths', 'auths.user_id', 'users.id')
    .where('auths.id', ctx.auth.user?.userId)
    .first()
  if (!user) {
    throw new Error('User not found')
  }

  return user
}

const ModelName = 'Credit Card'

export default class CreditCardController {
  public async index(ctx: HttpContextContract) {
    let user: User
    try {
      user = await getUser(ctx)
    } catch (error) {
      return ctx.response.badRequest(error.message)
    }

    const creditCards = await UserCreditCard.query().where('user_id', user.id)
    if (!creditCards) {
      return ctx.response.badRequest(`${ModelName} not found`)
    }

    ctx.response.status(200).send({
      message: `${ModelName} listed`,
      payload: creditCards,
    })
  }

  public async create(ctx: HttpContextContract) {
    const { cvv, expirationDate, name, number, isActive } = ctx.request.body() as CreditCardData

    let user: User
    try {
      user = await getUser(ctx)
    } catch (error) {
      return ctx.response.badRequest(error.message)
    }

    const creditCard = await UserCreditCard.create({
      cvv,
      expirationDate,
      name,
      number,
      userId: user.id,
      isSelected: isActive || true,
    })
    if (!creditCard.$isPersisted) {
      ctx.response.status(400).send({
        message: `${ModelName} not created`,
      })
    }

    ctx.response.status(201).send({
      message: `${ModelName} created`,
      payload: creditCard,
    })
  }

  public async update(ctx: HttpContextContract) {
    const { id, cvv, expirationDate, name, number, isActive } =
      ctx.request.body() as Partial<CreditCardData> & { id: number }

    let user: User
    try {
      user = await getUser(ctx)
    } catch (error) {
      return ctx.response.badRequest(error.message)
    }

    const queryCreditCard = await UserCreditCard.query()
      .where('user_id', user.id)
      .where('id', id)
      .first()
    if (!queryCreditCard) {
      return ctx.response.badRequest(`${ModelName} not found`)
    }

    const updatedAddress = await queryCreditCard
      .merge({
        cvv,
        expirationDate,
        name,
        number,
        userId: user.id,
        isSelected: isActive || false,
      })
      .save()
    if (!updatedAddress.$isPersisted) {
      ctx.response.status(400).send({
        message: `${ModelName} not updated`,
      })
    }

    ctx.response.status(201).send({
      message: `${ModelName} updated`,
      payload: updatedAddress,
    })
  }

  public async select(ctx: HttpContextContract) {
    const { id } = ctx.request.body() as { id: number }

    let user: User
    try {
      user = await getUser(ctx)
    } catch (error) {
      return ctx.response.badRequest(error.message)
    }

    const queryCreditCard = await UserAddress.query().where('user_id', user.id)
    if (!queryCreditCard) {
      return ctx.response.badRequest(`${ModelName} not found`)
    }

    await Promise.all(
      queryCreditCard.map(async (creditCard) => {
        if (creditCard.id === id) {
          return creditCard
            .merge({
              isSelected: true,
            })
            .save()
        }
        return creditCard
          .merge({
            isSelected: false,
          })
          .save()
      })
    )

    ctx.response.status(201).send({
      message: `${ModelName} updated with active status`,
    })
  }

  public async delete(ctx: HttpContextContract) {
    const id = ctx.request.param('id') as number

    let user: User
    try {
      user = await getUser(ctx)
    } catch (error) {
      return ctx.response.badRequest(error.message)
    }

    const queryCreditCard = await UserAddress.query()
      .where('user_id', user.id)
      .where('id', id)
      .first()
    if (!queryCreditCard) {
      return ctx.response.badRequest(`${ModelName} not found`)
    }

    queryCreditCard.delete()

    ctx.response.status(200).send({
      message: `${ModelName} deleted`,
    })
  }
}
