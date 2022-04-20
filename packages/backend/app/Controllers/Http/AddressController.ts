import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import UserAddress from '../../Models/UserAddress'

type AddressData = {
  identification: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  country: string
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

const ModelName = 'Address'

export default class AddressController {
  public async active(ctx: HttpContextContract) {
    let user: User
    try {
      user = await getUser(ctx)
    } catch (error) {
      return ctx.response.badRequest(error.message)
    }

    const address = await UserAddress.query()
      .where('user_id', user.id)
      .where('isSelected', true)
      .first()
    if (!address) {
      return ctx.response.badRequest(`${ModelName} not found`)
    }

    ctx.response.status(200).send({
      message: `${ModelName} listed`,
      payload: address,
    })
  }

  public async index(ctx: HttpContextContract) {
    let user: User
    try {
      user = await getUser(ctx)
    } catch (error) {
      return ctx.response.badRequest(error.message)
    }

    const addresses = await UserAddress.query().where('user_id', user.id)
    if (!addresses) {
      return ctx.response.badRequest(`${ModelName} not found`)
    }

    ctx.response.status(200).send({
      message: `${ModelName} listed`,
      payload: addresses,
    })
  }

  public async create(ctx: HttpContextContract) {
    const {
      city,
      complement,
      country,
      identification,
      neighborhood,
      number,
      postalCode,
      state,
      street,
      isActive,
    } = ctx.request.body() as AddressData

    let user: User
    try {
      user = await getUser(ctx)
    } catch (error) {
      return ctx.response.badRequest(error.message)
    }

    const address = await UserAddress.create({
      address: street,
      city,
      complement,
      country,
      identification,
      neighborhood,
      number: number || 'S/N',
      postalCode,
      state,
      userId: user.id,
      isSelected: isActive || false,
    })
    if (!address.$isPersisted) {
      ctx.response.status(400).send({
        message: `${ModelName} not created`,
      })
    }

    ctx.response.status(201).send({
      message: `${ModelName} created`,
      payload: address,
    })
  }

  public async update(ctx: HttpContextContract) {
    const {
      id,
      city,
      complement,
      country,
      identification,
      neighborhood,
      number,
      postalCode,
      state,
      street,
      isActive,
    } = ctx.request.body() as Partial<AddressData> & { id: number }

    let user: User
    try {
      user = await getUser(ctx)
    } catch (error) {
      return ctx.response.badRequest(error.message)
    }

    const queryAddress = await UserAddress.query().where('user_id', user.id).where('id', id).first()
    if (!queryAddress) {
      return ctx.response.badRequest(`${ModelName} not found`)
    }

    const updatedAddress = await queryAddress
      .merge({
        address: street,
        city,
        complement,
        country,
        identification,
        neighborhood,
        number: number || 'S/N',
        postalCode,
        state,
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

    const queryAddress = await UserAddress.query().where('user_id', user.id)
    if (!queryAddress) {
      return ctx.response.badRequest(`${ModelName} not found`)
    }

    await Promise.all(
      queryAddress.map(async (address) => {
        if (address.id === id) {
          return address
            .merge({
              isSelected: true,
            })
            .save()
        }
        return address
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

    const queryAddress = await UserAddress.query().where('user_id', user.id).where('id', id).first()
    if (!queryAddress) {
      return ctx.response.badRequest(`${ModelName} not found`)
    }

    queryAddress.delete()

    ctx.response.status(200).send({
      message: `${ModelName} deleted`,
    })
  }
}
