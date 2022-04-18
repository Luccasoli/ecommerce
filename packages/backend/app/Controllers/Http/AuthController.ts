import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Auth from 'App/Models/Auth'
import User from 'App/Models/User'

export default class AuthController {
  public async index() {
    return {}
  }

  public async create(ctx: HttpContextContract) {
    const { CPF, email, firstName, lastName, password } = ctx.request.body() as {
      email: string
      password: string
      firstName: string
      lastName: string
      CPF: string
    }

    // TODO: handle rollback if any of the following steps fails
    const user = await User.create({
      firstName,
      lastName,
      CPF,
    })
    if (!user.$isPersisted) {
      ctx.response.status(400).send({
        message: 'User not created',
      })
    }

    const auth = await Auth.create({
      email,
      password,
      userId: user.id,
    })
    if (!auth.$isPersisted) {
      ctx.response.status(400).send({
        message: 'Auth not created',
      })
    }

    ctx.response.status(201).send({
      message: 'User and Auth created',
    })
  }
}
