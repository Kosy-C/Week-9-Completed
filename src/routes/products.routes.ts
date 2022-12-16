import express, { Request, Response, NextFunction } from "express";
const productRouter = express.Router();
import * as Product from "../controllers/products.controller"
import { dashboardGetProducts } from "../controllers/products.controller";
import validateProductData from "../middleware/validate-product-data"
import { validateRequestParameter } from "../middleware/validate.request.data"
//import validateFileUpload from "../middleware/validate-file-upload";
import { upload } from '../utils/multer';
// import storage from "../utils/cloud-storage";
// import multer from "multer";
// const uploads = multer({ storage, limits: { fileSize: 20 * 1024 * 20480 } });


// productRouter.get('/products', function(req: Request, res: Response, next: NextFunction) {
//   res.render('index', { title: 'My Ecommerce App' });
// });

productRouter.post('/create-products', 
    upload.single("image"), 
    // validateFileUpload, 
    // validateProductData, 
    Product.addProduct)

productRouter.get('/products', Product.getProducts)

productRouter.route('/product/:id')
  .all(validateRequestParameter)
  .get(Product.getProductById)
  .put(validateProductData, Product.updateProductById)
  .delete(Product.deleteProductById)


/*patch method is the same thing with put method */
/*when you're using put, you're updating everything(ie, a single product), when you're using patch, you're updating bit by bit */


productRouter.get('/dashboard', dashboardGetProducts)

productRouter.get('/addproduct', function(req: Request, res: Response, next: NextFunction) {
  res.render('addproduct', { title: "KoKo's Store" });
});
// productRouter.get('/showproduct', function(req: Request, res: Response, next: NextFunction) {
//   res.render('showproduct', { title: "KoKo's Store" });
// });
productRouter.get('/editproduct', function(req: Request, res: Response, next: NextFunction) {
  res.render('editproduct', { title: "KoKo's Store" });
});
// productRouter.post('/create-products', Product.addProduct)


// productRouter.get('/products',(req,res)=>{
//     res.render('showproduct', { title: "KoKo's Store" });
// })



export default productRouter;