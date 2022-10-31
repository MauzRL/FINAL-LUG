import { Request, Response } from "express";
import productModel from "../models/productos"

const productController = {
    get: async (req: Request, res: Response) =>{
        try
        {
            const allProducts = await productModel.find()
            res.status(200).send(allProducts)
        }
        catch (error)
        {
            res.status(500).send(error)
        }
    },
    add: async (req: Request, res: Response) =>{
        try {
            const newProduct = new productModel({name: req.body.name})
            await newProduct.save()
            res.send(newProduct)
        } catch (error) {
            res.status(500).send(error)
        }
    },

    delete: async(req: Request, res: Response) => {
        try {
            
            const productName = await productModel.findOneAndDelete({name: req.body.name})
            res.send(`Se elimino ${productName}`)
            
        } catch(error){
            res.status(500).send(error)
        }
    }
}

export default productController 