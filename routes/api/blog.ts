 import { Router } from "express";
import blogController from "../../controllers/blog";

const router = Router();

router.post("/", blogController.add);
router.get("/", blogController.get);
router.post("/:id/comment", blogController.addComment);

export default router;

//put para sobreescribir
//post para agregar algo nuevo