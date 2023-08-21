import productsService from './product.service.js'
import { verify } from '../../helper/jwt.js'

class Productcontroller {
    async retriveproduct(req, res) {
        const { pageNumber, pageSize } = req.query
        const { token } = req.headers

        try {
            const {id} = verify(token, process.env.SECRET_KEY)

        if(id){
        const productlist = await productsService.retrieveProductList({
            pageNumber: pageNumber ?? 1,
            pageSize: pageSize ?? 3,
        })

        res.json(productlist)
        }else{
            res.json({message:'token bilan xato bor'})
        }
        } catch (error) {
            res.json({error:error.message})
        }

        
    }

    async createProduct(req, res) {
        const {token} = req.headers
        const { title, price, category } = req.body
        const {id} = verify(token, process.env.SECRET_KEY)
    console.log(id);
        if(id != '15'){ 
        res.json('yuu not admin')
        }else{
                await productsService.createProduct({
            title,
            price,
            category
        })

        res.json('success')
        }
        
    }

    async retrieveById(req, res) {
        const { product_id } = req.params
        const {token} = req.headers
        try {
            const {id} = verify(token, process.env.SECRET_KEY)
            if(!id ){

           res.json('token bilan xato bor')
        }else{
            const data = await productsService.retrieveById(product_id)

        res.json(data)

        }
        } catch (error) {
            res.json({error:error.message})
        }
        
    }

    

    async getwithcategory(req, res) {
        const { category } = req.query
        const {token} = req.headers
        try {
            const {id} = verify(token, process.env.SECRET_KEY)
            if(!id ){

           res.json('token bilan xato bor')
        
        }else{

            const data = await productsService.retrieveByCategory(category)
        res.json(data)

        }
        } catch (error) {
            res.json({error:error.message})
        }
        
    }



    async getwithsearch(req, res) {
        const { search } = req.query
        const {token} = req.headers
        try {
            const {id} = verify(token, process.env.SECRET_KEY)
            if(!id ){

           res.json('token bilan xato bor')
        
        }else{

            const data = await productsService.retrieveBySearch(search)
        res.json(data)

        }
        } catch (error) {
            res.json({error:error.message})
        }
        
    }

}

export default new Productcontroller()
