import { sign, verify } from '../../helper/jwt.js'
import { PostgresModel } from '../../postgres/postgres.js'

export class AuthModel {
    #_postgres

    constructor() {
        this.#_postgres = new PostgresModel()
    }

    async userRetrieve({ username, password }) {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM users WHERE username = $1 AND password = crypt($2, password)
        `, username, password)

        return data
    }


    async deleteaccount({ id }) {
        const data = await this.#_postgres.fetch(`

        WITH deleted_user AS (
            UPDATE users
            SET deleted_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING id
        )
        DELETE FROM orders
        WHERE user_id = (SELECT id FROM deleted_user);
    `, id)
        return data
    }
    

    async retrieveUserbyid({ id }) {
        const data = await this.#_postgres.fetch(`
            SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL
        `, id)
        return data
    }

    async signoutUser({ id }) {
        const data = await this.#_postgres.fetch(`
            UPDATE
            users
        SET
            deleted_at = CURRENT_TIMESTAMP
        WHERE
            id = $1
        `, id)
        return data
        // console.log(data, refreshToken)
    }

    async createUser({ username, password  }) {
        const data = await this.#_postgres.fetch(`
            INSERT INTO
                users(
                    username,
                    password
                )
            VALUES($1, crypt($2, gen_salt('bf', 4)))
            RETURNING id
        `, username, password)

        return data


    }



    async createUserDevice({ acssesToken, refreshToken }) {
        const data = await this.#_postgres.fetch(`
            INSERT INTO
                users_devices(
                    user_id,
                    acssestoken,
                    refreshtoken
                )
            VALUES($1, $2, $3)
            RETURNING id
        `, verify(acssesToken, process.env.SECRET_KEY).id, acssesToken, refreshToken)
 
        return data

 
    } 


    
    async refreshtoken({ acssesToken, refreshToken, id }) {
        await this.#_postgres.fetch(`
            UPDATE
                users_devices
            SET
            acssestoken = $1, refreshtoken = $2
            WHERE user_id = $3
        `, acssesToken, refreshToken, id)
    }


    async profilepatch({role, birthday, email, id}) {
        const data = await this.#_postgres.fetch(`
        UPDATE users
        SET
            role = $1,
            birthday = COALESCE($2, birthday),
            email = COALESCE($3, email),
            updated_at = current_timestamp
        WHERE
            id = $4 and deleted_at is null
        RETURNING *
        `, role, birthday, email, id)
        return data
        
    }
}


