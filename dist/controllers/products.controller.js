"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductById = exports.updateProductById = exports.getProductById = exports.dashboardGetProducts = exports.getProducts = exports.addProduct = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const products_model_1 = __importDefault(require("../models/products.model"));
const bad_request_1 = __importDefault(require("../errors/bad-request"));
// import { IProducts } from "../../typings.d"
// upload
exports.addProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, brand, category, description, price, countInStock, rating, numReviews, image } = req.body;
    const product = yield products_model_1.default.create({
        name,
        image: req.file.path,
        brand,
        category,
        description,
        price,
        countInStock,
        rating,
        numReviews,
    });
    // res.status(201).render("dashboard", { prods: product })
    res.status(201).redirect("/dashboard");
    // json({
    //   message: "Product successfully added",
    //   data: {
    //     product,
    //   },
    //   status: true,
    // });
}));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pageNum = Number(req.query.pageNum) || 0;
        console.log(pageNum);
        const products = yield products_model_1.default.find({}).limit(5).skip(pageNum * 5);
        // const products = await Products.find()
        const noOfPages = (yield products_model_1.default.find({}).count()) / 5;
        if (products) {
            res.status(200).render("index", { prods: products, noOfPages });
        }
        else {
            res.status(400).json({
                message: "All products failed to retrieve"
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
            route: '/'
        });
    }
});
exports.getProducts = getProducts;
const dashboardGetProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield products_model_1.default.find({});
        console.log("products");
        if (products) {
            res.status(200).render("dashboard.ejs", { products: products });
        }
        else {
            res.status(400).json({
                message: "All products failed to retrieve"
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Internal Server Error",
            route: '/'
        });
    }
});
exports.dashboardGetProducts = dashboardGetProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params._id;
    const product = yield products_model_1.default.findOne({ _id: _id });
    if (!product) {
        throw new bad_request_1.default("Product not found");
    }
    res.status(200).render('product', { product: product });
});
exports.getProductById = getProductById;
const updateProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const product = yield products_model_1.default.findOne({ id });
    if (!product) {
        throw new bad_request_1.default("Product not found");
    }
    req.body.price = `N${req.body.price}`;
    const updatedProduct = yield products_model_1.default.findByIdAndUpdate({ id }, Object.assign({ id }, req.body));
    res.status(200).json({
        message: `Product with id ${id} updated successfully`,
        data: {
            updatedProduct,
        },
        status: true,
    });
});
exports.updateProductById = updateProductById;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const product = yield products_model_1.default.findOne({ id });
    if (!product) {
        throw new bad_request_1.default("Product not found");
    }
    yield products_model_1.default.findByIdAndDelete({ id });
    res.status(200).json({
        message: `Product with id ${id} deleted successfully`,
        data: {},
        status: true,
    });
});
exports.deleteProductById = deleteProductById;
//# sourceMappingURL=products.controller.js.map