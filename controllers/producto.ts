import { request, Request, Response } from "express";
import { isErrored } from "stream";
import { isNull, isNumber } from "util";
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

            const isInProducts = await productModel.findOne({name: req.body.name})

            if (isInProducts) {

                res.send('Este producto ya se encuentra en la Base de Datos')

            } else {

                const newProduct = new productModel({...req.body})
                await newProduct.save()
                res.send(newProduct)
            }

        } catch (error) {
            res.status(500).send(error)
        }
    },

    delete: async(req: Request, res: Response) => {
        try {

            const isInProducts = await productModel.findOne({name: req.body.name})

            if (!isInProducts) {
                res.send("No se encontro el producto")
                
            } else {

                const productName = await productModel.findOneAndDelete({name: req.body.name})
                res.send(`Se elimino ${productName}`)   
            }
            
        } catch(error){
            res.status(500).send(error)
        }
    },

    update: async(req:Request, res: Response) => {
        try {
            const isInProducts = await productModel.findOne({name: req.body.name})

            const util = require('util')

            

           const numeroPrice =  util.isNumber(req.body.price)
           const numeroStock =  util.isNumber(req.body.stock)


            if (!isInProducts) {
                res.send("No se encuentra ese producto")

            } else if(!numeroPrice || !numeroStock) {
                res.send("Complete los campos")

            } else {          

                isInProducts.price = req.body.price
                isInProducts.stock = req.body.stock
                isInProducts.save()

                res.send(`Se actualizo correctamente ${isInProducts.name}. \n ${isInProducts}`)
            }


        } catch (error) {
            res.status(500).send(error)

        }
    }
}

export default productController 