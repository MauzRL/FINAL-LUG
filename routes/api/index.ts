import { Router } from "express";
import blogRoutes from "./blog";
import userRoutes from "./user"
import productsRoutes from "./productos"
import cartRoutes from "./cart"



const router = Router();

router.use("/blogs", blogRoutes)
router.use("/user", userRoutes)
router.use("/productos", productsRoutes)
router.use("/carrito", cartRoutes)



export default router;
