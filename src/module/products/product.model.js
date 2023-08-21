import { PostgresModel } from '../../postgres/postgres.js'

export class productModel {
    #_postgres

    constructor() {
        this.#_postgres = new PostgresModel()
    }




    async retiveById(product_id) {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM products WHERE id = $1
        `, product_id)
        return data
    }


    async retrieveByCategory(category) {
        const data = await this.#_postgres.fetch(`
        SELECT
    p.id AS product_id,
    p.title AS product_title,
    p.price AS product_price,
    c.name AS category_name,
    sc.sub_category_name AS sub_category_name
FROM
    products p
JOIN
    subcategory sc ON p.category = sc.id
JOIN
    category c ON sc.parent_id = c.id
WHERE
    c.name = $1
    OR sc.sub_category_name = $1
        `, category)
        return data
    }



    async retrieveBySearch(search) {
        const data = await this.#_postgres.fetch(`
        SELECT
    p.id AS product_id,
    p.title AS product_title,
    p.price AS product_price,
    c.name AS category_name,
    sc.sub_category_name AS sub_category_name
FROM
    products p
JOIN
    subcategory sc ON p.category = sc.id
JOIN
    category c ON sc.parent_id = c.id
WHERE
    p.title ILIKE '%${search}%'
    OR c.name ILIKE '%${search}%'
    OR sc.sub_category_name ILIKE '%${search}%';
        `)
        return data
        
    }



    async createProduct(title, price, category) {
        const data = await this.#_postgres.fetch(`
            INSERT INTO products (title, price, category) values ($1, $2, $3)
        `, title, price, category)

        return data
    }

    async getProductsByLimit(pageNumber, pageSize) {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM products OFFSET $1 LIMIT $2
        `, pageNumber, pageSize)

        return data
    }


    }


