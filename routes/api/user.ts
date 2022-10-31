import { Router } from "express";
import userController from "../../controllers//user";

const router = Router();

router.post("/", userController.add);
router.get("/", userController.get);

export default router;