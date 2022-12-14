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
const authRouter = express_1.default.Router();
const validate_user_data_1 = __importDefault(require("../middleware/validate-user-data"));
const validate_login_1 = __importDefault(require("../middleware/validate-login"));
const { registerUser, handleLogin, handleLogout } = require("../controllers/auth.controller");
const Product = __importStar(require("../controllers/products.controller"));
const productRouter = express_1.default.Router();
productRouter.get('/', Product.getProducts);
authRouter.post('/register', validate_user_data_1.default, registerUser);
authRouter.post('/login', validate_login_1.default, handleLogin);
authRouter.get('/logout', handleLogout);
authRouter.get('/login', (req, res) => {
    res.render("login", { Login: 'login' });
});
authRouter.get('/register', (req, res) => {
    res.render("signup", { SignUp: 'signup' });
});
// authRouter.get('/dashboard', (req, res) => {
//     res.render("dashboard",  {Dashboard: "dashboard"})
// })
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map