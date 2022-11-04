import { Router } from "express";
import blogRoutes from "./blog";
import userRoutes from "./user"
import productsRoutes from "./productos"
import cartRoutes from "./cart"
import cartDetalsRoutes from './cartDetails'



const router = Router();

router.use("/blogs", blogRoutes)
router.use("/user", userRoutes)
router.use("/productos", productsRoutes)
router.use("/carrito", cartRoutes)
router.use("/carrito-details", cartDetalsRoutes)




export default router;
