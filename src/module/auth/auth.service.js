import { AuthModel } from './auth.model.js'
import { sign, verify } from '../../helper/jwt.js'

class UserService {
    #_authModel

    constructor() {
        this.#_authModel = new AuthModel()
    }

    async signUp(payload) {
        await this.#_checkExistingUser({
            username: payload.username,
            password: payload.password

        })
 
        const [ newUser ] = await this.#_authModel.createUser({
            username: payload.username,
            password: payload.password
        })
        
        .catch(() =>  undefined )
        const acssesToken = sign({id: newUser?.id}, 10000)
        const refreshToken = sign({id: newUser?.id}, 20000)
        await this.#_authModel.createUserDevice({
            acssesToken: acssesToken, 
            refreshToken: refreshToken
        })

        if(!newUser) {
            throw new Error('Internal Server Error')
        }




        return {
            acssesToken,
            refreshToken
        }
    }

    async signIn(payload) {
        const user = await this.#_checkUser({
            username: payload.username,
            password: payload.password,
        })
        const acssesToken = sign({id: user?.id}, 5000)
        
        const refreshToken = sign({id: user?.id}, 10000)


        return {
            acssesToken,
            refreshToken
        }
    }

    async signOut(payload) {
        
const {id} = verify(payload.token, process.env.SECRET_KEY)
const [ user ] = await this.#_authModel.retrieveUserbyid({
            id
        })
        
        if( user ) {
            await this.#_authModel.signoutUser({
                id
            })
        }else{
            throw new Error('token invalid')
        }


        return null
    }

    async refresh(payload) {
        const { id } = verify(payload.refreshToken, process.env.SECRET_KEY)
        const [ user ] = await this.#_authModel.retrieveUserbyid({
            id
        })

        if( user ) {
        const acssesToken = sign({ id: user.id }, 5000)
        const refreshToken = sign({ id: user.id }, 10000)
            await this.#_authModel.refreshtoken({
                acssesToken,
                refreshToken,
                id
            })
return {refreshToken, acssesToken }
        }else{
            throw new Error('token invalid')
        }


        
    }

    async profile(payload) {
        const { id } = verify(payload.token, process.env.SECRET_KEY)
        const [ user ] = await this.#_authModel.retrieveUserbyid({
            id
        })
        return user


        
    }

    async deleteaccount(payload) {
        const { id } = verify(payload.token, process.env.SECRET_KEY)
        await this.#_authModel.deleteaccount({
            id
        })
        return null


        
    }


    async profilepatch(payload) {
        const { id } = verify(payload.token, process.env.SECRET_KEY)
        const user = await this.#_authModel.profilepatch({
          role:  payload.role,
          birthday:  payload.birthday,
          email:  payload.email,
            id
        })
        return user


        
    }
    

    async #_checkUser(payload) {
        const [ user ] = await this.#_authModel.userRetrieve({
            username: payload.username,
            password: payload.password,
        })

        if(!user) {
            throw new Error('Not found')
        }

        return user
    }

    async #_checkExistingUser({ username, password }) {
        const [ user ] = await this.#_authModel.userRetrieve({
            username,
            password,
        })

        if(user) {
            throw new Error('User already exists')
        }

        return user
    }
}

export default new UserService()
