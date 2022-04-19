import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Auth from 'App/Models/Auth'
import User from 'App/Models/User'

type UserData = {
  email: string
  password: string
  firstName: string
  lastName: string
  CPF: string
}

export default class AuthController {
  public async index(ctx: HttpContextContract) {
    const userData = await User.find(await ctx.auth.user?.userId)

    ctx.response.status(200).send({
      payload: userData,
    })
  }

  public async create(ctx: HttpContextContract) {
    const { CPF, email, firstName, lastName, password } = ctx.request.body() as UserData

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

  public async login(ctx: HttpContextContract) {
    const { email, password } = ctx.request.body() as Pick<UserData, 'email' | 'password'>

    try {
      const token = await ctx.auth.use('api').attempt(email, password)

      const user = await Database.from('users')
        .whereExists(
          Database.raw(
            `select * from users join auths on auths.user_id = users.id where auths.email = '${email}'`
          )
        )
        .first()

      return ctx.response.status(200).send({
        message: 'Login successful',
        data: { auth: token, user },
      })
    } catch (error) {
      console.log(error)
      return ctx.response.badRequest('Invalid credentials')
    }
  }
}
