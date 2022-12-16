import Joi from "joi";
import { Request, Response, NextFunction } from "express"
import expressAsyncHandler from "express-async-handler";

const validateProductData = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        name: Joi.string().required(), 
        image: Joi.string().required(),
        brand: Joi.string().required(),
        category: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.string().min(1).required(),
        countInStock: Joi.string().min(1).required(),
        rating: Joi.string().min(1).max(5).required(),
        numReviews: Joi.string().min(0).required(),
    })

    await schema.validateAsync(req.body)

    next()
})

export default validateProductData;