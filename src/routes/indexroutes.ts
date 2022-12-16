import { Router, Request, Response, NextFunction } from "express"
import authRouter from "./auth.routes"
import productRouter from "./products.routes"
import validateToken from "../middleware/authentication"
import {getProducts, getProductById} from '../controllers/products.controller'
import validateLogin from "../middleware/validate-login"

const router = Router()

router.get('/', getProducts)
router.get('/product/:_id', getProductById)


router.use(authRouter)
router.use(validateToken)
router.use(productRouter)

router.use(function(req: Request, res: Response, next: NextFunction) {
    res.status(404).render('error', {
      message: "Page not found"
    });
});

export default router;

//this is the major router