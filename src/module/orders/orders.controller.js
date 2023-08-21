import orderService from './orders.service.js'
import { verify } from '../../helper/jwt.js'

class Productcontroller {
    async retriveorder(req, res) {
        
        const {token} = req.headers
        const {id} = verify(token, process.env.SECRET_KEY)
        if(id != 15 ){
            const usersorder = await orderService.retrieveorder({
                id
            })
            res.json(usersorder)
              
        }else{
            const productlist = await orderService.retrieveorderadmin({
        })
        res.json(productlist)
        }    
    } 


    async retrieveById(req, res) {
        const { id } = req.params

        const data = await productsService.retrieveById({
            id
        })

        res.json(data)

    }


    async postorder(req, res) {
        const { token } = req.headers
        const {product_id} = req.body
        const {id} = verify(token, process.env.SECRET_KEY)
        
        await orderService.postorder({
            id: id,
            product_id: product_id
        })

        res.json("success")

    }
    

    
}

export default new Productcontroller()
