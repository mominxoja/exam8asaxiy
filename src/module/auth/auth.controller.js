import AuthService from './auth.service.js'

class AuthController {
    async signUp(req, res) {
        const { username, password } = req.body

        const serviceResponse = await AuthService.signUp({
            username,
            password

        })
        

        res.status(201).json({
            serviceResponse
        })
    }

    async signIn(req, res) {
        const { username, password } = req.body

        const serviceResponse = await AuthService.signIn({
            username,
            password,

        })

        res.status(200).json({
            data: serviceResponse
        })
    }

    async signOut(req, res) {
        const { token } = req.headers
        await AuthService.signOut({
            token
        })

        res.sendStatus(204)
    }

    async refresh(req, res) {
        const { refresh_token } = req.headers
        
        const serviceResponse = await AuthService.refresh({refreshToken: refresh_token})  
        
        res.status(200).json({
            serviceResponse
        
        })
    }

    async profile(req, res) {
        const { token } = req.headers
        
        const serviceResponse = await AuthService.profile({token})  
        
        res.status(200).json({
            serviceResponse
        
        })
    }


    async deleteaccount(req, res) {
        const { token } = req.headers
        
        const serviceResponse = await AuthService.deleteaccount({token})  
        
        res.status(200).json({
            serviceResponse
        
        })
    }


    async profilepatch(req, res) {
        const { token } = req.headers
        const {email, role, birthday} = req.body
        const serviceResponse = await AuthService.profilepatch({token, email, role, birthday})  
        res.status(200).json(
            serviceResponse
        )
    }
}

export default new AuthController()
