import { PostgresModel } from '../../postgres/postgres.js'

export class orderModel {
    #_postgres

    constructor() {
        this.#_postgres = new PostgresModel()
    }

    async getAllProduct() {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM products
        `)

        return data
    }


    async retiveById(id) {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM products WHERE id = $1
        `, id)

        return data
    }

    async postorder(id, product_id) {
        const data = await this.#_postgres.fetch(`
            INSERT INTO orders (user_id, product_id) values ($1, $2)

        `, id, product_id)

        return data
    }

    async getorderadmin() {
        const data = await this.#_postgres.fetch(`
        SELECT 
        orders.id AS order_id,
          users.username AS username,
          products.title AS product_name,
          products.price AS product_price
        FROM 
          orders 
          JOIN users  ON orders.user_id = users.id
          JOIN products  ON orders.product_id = products.id 
        GROUP BY 
        orders.id,
        users.username,
        products.title,
        products.price
        `)

        return data
    }


    async getorder(id) {
        const data = await this.#_postgres.fetch(`
        SELECT 
          products.title AS product_name,
          products.price AS product_price
        FROM 
          orders 
          JOIN users  ON orders.user_id = users.id
          JOIN products  ON orders.product_id = products.id
          where users.id = $1 and users.deleted_at is null 
        GROUP BY 
        orders.id,
        products.title,
        products.price
        `, id)
        return data
    }
}


