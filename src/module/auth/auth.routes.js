import { Router } from 'express'
import AuthController from './auth.controller.js'

export const authRoutes = Router()
    .post('/sign-up', AuthController.signUp)
    .post('/sign-in', AuthController.signIn)
    .post('/sign-out', AuthController.signOut)
    .get('/profile', AuthController.profile)
    .patch('/profile', AuthController.profilepatch)
    .post('/refresh', AuthController.refresh)
    .delete('/profile', AuthController.deleteaccount)

     