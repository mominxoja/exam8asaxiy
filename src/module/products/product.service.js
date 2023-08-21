import { productModel } from './product.model.js'

class productsService {
    #_prdouctmodel

    constructor() {
        this.#_prdouctmodel = new productModel()
    }

    async retrieveProductList({
        pageNumber,
        pageSize,
    }) {

        const data = await this.#_prdouctmodel.getProductsByLimit((pageNumber - 1) * pageSize, pageSize)
        return {
            pageNumber,
            pageSize,
            data
        }
    }


    async createProduct(payload) {

        await this.#_prdouctmodel.createProduct(
            payload.title,
            payload.price,
            payload.category
        )
      
    }



    async retrieveById(product_id) {
       const data = await this.#_prdouctmodel.retiveById(product_id)
        return data
    }

    async retrieveByCategory(category) {
        const data = await this.#_prdouctmodel.retrieveByCategory(category)
         return data
     }


     async retrieveBySearch(search) {
        const data = await this.#_prdouctmodel.retrieveBySearch(search)
         return data
     }
}

export default new productsService()
