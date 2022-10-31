import { Request, Response } from "express";
import userModel from "../models/user"

const userController = {
    get: async (req: Request, res: Response) =>{
        try
        {
            const allBlogs = await userModel.find()
            res.status(200).send(allBlogs)
        }
        catch (error)
        {
            res.status(500).send(error)
        }
    },
    add: async (req: Request, res: Response) =>{
        try {
            const myUser = new userModel({...req.body})
            await myUser.save()
            res.send(myUser)
        } catch (error) {
            res.status(500).send(error)
        }
    },
}

export default userController //import userController from "../../../controllers/User/User";