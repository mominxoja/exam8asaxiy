import { Router } from 'express'
import { authRoutes } from '../module/auth/auth.routes.js'
import { ProductRoute } from '../module/products/product.routes.js'
import { OrderRoute } from '../module/orders/orders.routes.js'
// import VerifyAccessMiddleware from '../middleware/verify-access.middleware.js'

export const routes = Router()
    .use(authRoutes)
    .use(ProductRoute)
    .use(OrderRoute)
    // .use('/*', VerifyAccessMiddleware.verify)
