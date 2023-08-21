import { Router } from 'express'
import orderscontroller from './orders.controller.js'

export const OrderRoute = Router()
    .post('/orders', orderscontroller.postorder)
    .get('/orders', orderscontroller.retriveorder)
