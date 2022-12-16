"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRouter = express_1.default.Router();
const Product = __importStar(require("../controllers/products.controller"));
const products_controller_1 = require("../controllers/products.controller");
const validate_product_data_1 = __importDefault(require("../middleware/validate-product-data"));
const validate_request_data_1 = require("../middleware/validate.request.data");
//import validateFileUpload from "../middleware/validate-file-upload";
const multer_1 = require("../utils/multer");
// import storage from "../utils/cloud-storage";
// import multer from "multer";
// const uploads = multer({ storage, limits: { fileSize: 20 * 1024 * 20480 } });
// productRouter.get('/products', function(req: Request, res: Response, next: NextFunction) {
//   res.render('index', { title: 'My Ecommerce App' });
// });
productRouter.post('/create-products', multer_1.upload.single("image"), 
// validateFileUpload, 
// validateProductData, 
Product.addProduct);
productRouter.get('/products', Product.getProducts);
productRouter.route('/product/:id')
    .all(validate_request_data_1.validateRequestParameter)
    .get(Product.getProductById)
    .put(validate_product_data_1.default, Product.updateProductById)
    .delete(Product.deleteProductById);
/*patch method is the same thing with put method */
/*when you're using put, you're updating everything(ie, a single product), when you're using patch, you're updating bit by bit */
productRouter.get('/dashboard', products_controller_1.dashboardGetProducts);
productRouter.get('/addproduct', function (req, res, next) {
    res.render('addproduct', { title: "KoKo's Store" });
});
// productRouter.get('/showproduct', function(req: Request, res: Response, next: NextFunction) {
//   res.render('showproduct', { title: "KoKo's Store" });
// });
productRouter.get('/editproduct', function (req, res, next) {
    res.render('editproduct', { title: "KoKo's Store" });
});
// productRouter.post('/create-products', Product.addProduct)
// productRouter.get('/products',(req,res)=>{
//     res.render('showproduct', { title: "KoKo's Store" });
// })
exports.default = productRouter;
//# sourceMappingURL=products.routes.js.map