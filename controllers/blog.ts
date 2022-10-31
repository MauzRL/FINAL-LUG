import { Request, Response } from "express";
import blogModel from "../models/blogs"

/*export*/const blogController = {
  get: async (req: Request, res: Response) =>{
    try
    {
        const allBlog = await blogModel.find()
        res.status(200).send(allBlog)
    }
    catch (error)
    {
        res.status(500).send(error)
    }
  },
  add: async (req: Request, res: Response) =>{
    try {
        const myBlog = new blogModel({...req.body})
        await myBlog.save()
        res.send(myBlog)
    } catch (error) {
        res.status(500).send(error)
    }
  },
  addComment: async (req: Request, res: Response) =>{
    try {
      const myBlog = await blogModel.find({_id: req.params.id})
      if (myBlog.length){
        myBlog[0].comments.push({...req.body})
      }
      res.send(myBlog)
    } catch (error) {
        res.status(500).send(error)
    }
  },
};

//export const blogController 
export default blogController
//import { blogController } from "../../../controllers/Blog/blog";