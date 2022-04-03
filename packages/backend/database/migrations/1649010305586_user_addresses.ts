import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserAddresses extends BaseSchema {
  protected tableName = 'user_addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('address').notNullable()
      table.string('number').notNullable()
      table.string('complement')
      table.string('neighborhood').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()
      table.string('postal_code').notNullable()
      table.string('country').notNullable()
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
