import pg from 'pg'
import dotenv from 'dotenv'

// dotenv.config()

export class PostgresModel {
    #pg

    constructor() {
        this.#pg = new pg.Pool({
            host: process.env.DB_HOST ?? '127.0.0.1',
            user: process.env.DB_USER ?? 'postgres',
            password: process.env.DB_PASSWORD ?? '1979',
            database: process.env.DB_DATABASE ?? 'exam8base'
        })
    }

    async fetch(SQL, ...params) {
        const client = await this.#pg.connect()
        try {
            const { rows } = await client.query(SQL, params.length ? params : null)
            return rows
        } catch(err) {
            console.log(err)
        } finally {
            client.release()
        }
    }

}