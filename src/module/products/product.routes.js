import { Router } from 'express'
import Productcontroller from './product.controller.js'

export const ProductRoute = Router()
    .post('/product', Productcontroller.createProduct )
    .get('/product', Productcontroller.retriveproduct)
    .get('/product/:product_id', Productcontroller.retrieveById)
    .get('/products/category/', Productcontroller.getwithcategory)
    .get('/products/search/', Productcontroller.getwithsearch)

    
