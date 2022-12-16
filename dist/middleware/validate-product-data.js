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
const joi_1 = __importDefault(require("joi"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validateProductData = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        name: joi_1.default.string().required(),
        image: joi_1.default.string().required(),
        brand: joi_1.default.string().required(),
        category: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        price: joi_1.default.string().min(1).required(),
        countInStock: joi_1.default.string().min(1).required(),
        rating: joi_1.default.string().min(1).max(5).required(),
        numReviews: joi_1.default.string().min(0).required(),
    });
    yield schema.validateAsync(req.body);
    next();
}));
exports.default = validateProductData;
//# sourceMappingURL=validate-product-data.js.map