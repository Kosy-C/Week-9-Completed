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
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validateUserData = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        fullname: joi_1.default.string().min(2).max(50).required(),
        email: joi_1.default.string().email().required(),
        gender: joi_1.default.string().valid("male", "female", "others").required(),
        phone: joi_1.default.string().required(),
        password: joi_1.default.string().min(8).required(),
        confirm_password: joi_1.default.string().min(8).required(),
        address: joi_1.default.string().required(),
    });
    yield schema.validateAsync(req.body);
    const { password, confirm_password } = req.body;
    if (password !== confirm_password) {
        throw new bad_request_1.default("Passwords do not match");
    }
    next();
}));
exports.default = validateUserData;
//# sourceMappingURL=validate-user-data.js.map