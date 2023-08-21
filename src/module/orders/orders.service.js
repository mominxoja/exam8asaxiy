import { orderModel } from './orders.model.js'
import { verify } from '../../helper/jwt.js'

class productsService {
    #_ordermodel

    constructor() {
        this.#_ordermodel = new orderModel()
    }

    async retrieveorder(payload) {

        const data = await this.#_ordermodel.getorder(payload.id)
        return data
        
    }


    async retrieveorderadmin() {

        const data = await this.#_ordermodel.getorderadmin()
        return data
        
    }



    async retrieveById(payload) {
       const data = await this.#_ordermodel.retiveById(payload.id)
        return data
    }


 
    async postorder(payload) {

        await this.#_ordermodel.postorder(payload.id, payload.product_id)
         return null
     }
}

export default new productsService()
