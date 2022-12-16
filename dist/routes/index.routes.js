"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const products_routes_1 = __importDefault(require("./products.routes"));
const authentication_1 = __importDefault(require("../middleware/authentication"));
const products_controller_1 = require("../controllers/products.controller");
const router = (0, express_1.Router)();
router.get('/', products_controller_1.getProducts);
router.get('/showproduct/:_id', products_controller_1.getProductById);
router.use(auth_routes_1.default);
router.use(authentication_1.default);
router.use(products_routes_1.default);
router.use(function (req, res, next) {
    res.status(404).render('error', {
        message: "Page not found"
    });
});
exports.default = router;
//this is the major router
//# sourceMappingURL=index.routes.js.map