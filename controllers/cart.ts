import { Request, Response } from "express";
import cartModel from "../models/cart"
import productoModel from "../models/productos"

const cartController = {
    get: async (req: Request, res: Response) =>{
        try
        {
            const myCart = await cartModel.findOne()
            if (!myCart) {
                res.send('El carrito se ecnuentra vacio')
            } else {

                let i
                let totalPrices = 0
                let price = 0

                let cant = 0
            
                const cart = await cartModel.find()

            for (i=0; i < cart.length; i++)
            {
                price = cart[i].price
                cant = cart[i].amount

                totalPrices = totalPrices + (cant*price)
            }


             res.status(200).send(`Su carrito: \n   ${cart}\n  Precio total: ${totalPrices}`)

            }
            
        }
        catch (error)
        {
            res.status(500).send(error)
        }
    },
    add: async (req: Request, res: Response) =>{
        try {

            
            const isInProducts = await productoModel.findOne({name: req.body.name})

            const isInCart = await cartModel.findOne({name: req.body.name})


            if(!isInProducts) {
                res.send('Este producto no se encuentra entre nuestros productos')
            } else if (!isInCart) {
                const newProductInCart = new cartModel({name: isInProducts.name, amount: 1, price: isInProducts.price})                    
            
                newProductInCart.save()
                res.send(`Se agrego el producto: "${newProductInCart.name}" al carrito ${newProductInCart} `)
            

            } else if (isInCart) {
               const producto = isInCart
                
               producto.amount++
               producto.save()
                res.send(producto)
                
            }

    
        } catch (error) {
            res.status(500).send(error)
        }
    },

    delete:async (req:Request, res: Response) => {

        try {

            const isInProducts = await productoModel.findOne({name: req.body.name})

            const isInCart = await cartModel.findOne({name: req.body.name})

            


            if(!isInProducts) {
                res.send('Este producto no se encuentra entre nuestros productos')
            } else if (!isInCart) {
            
                res.send('No se ecnuentra el prducto en el carrito')
            

            } else if (isInCart && isInCart.amount == 1) {
            
                const producto = isInCart
                
               producto.amount = 0
               
               const deleteProduct = await cartModel.findOneAndDelete({name: req.body.name})
               
                
               
               
                res.send(`Se elimino ${deleteProduct?.name} del carrito`)
                
            } else if(isInCart) {

                const producto = isInCart
                
               producto.amount--
               producto.save()
                res.send(producto)

            }

    
        } catch (error) {
            res.status(500).send(error)
        }

        
    }

}

export default cartController