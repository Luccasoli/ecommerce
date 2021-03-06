import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserCreditCards extends BaseSchema {
  protected tableName = 'user_credit_cards'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('is_selected').notNullable().defaultTo('false')
      table.string('name').notNullable()
      table.string('number').notNullable()
      table.string('expiration_date').notNullable()
      table.string('cvv').notNullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
