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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const users_model_1 = __importDefault(require("../models/users.model"));
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const not_found_1 = __importDefault(require("../errors/not-found"));
// import { IUser } from "../../typings"
const config_1 = __importDefault(require("../utils/config"));
const email_service_1 = __importDefault(require("../services/email.service"));
const email_template_1 = __importDefault(require("../utils/email-template"));
const { generateToken } = require('../utils/utils');
const bcrypt = require("bcryptjs");
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, fullname, email } = req.body;
    const userExists = yield users_model_1.default.findOne({ email: req.body.email });
    if (userExists) {
        throw new bad_request_1.default("User account exists already");
    }
    const salt = yield bcrypt.genSalt(10);
    const hashedPassword = yield bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    delete req.body.confirm_password;
    const url = `${config_1.default.serverPort}/login`;
    const emailData = {
        content: (0, email_template_1.default)(fullname, url),
        to: email,
        subject: "Techy_Jo Registration Confirmation"
    };
    yield (0, email_service_1.default)(emailData);
    const user = yield users_model_1.default.create(req.body);
    delete user.password;
    res.status(201).
        render('login.ejs', { User: user });
    // json({ 
    //     message: "User created successfully", 
    //     data: { user }, 
    //     status: true 
    // })
}));
const handleLogin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield users_model_1.default.findOne({ email });
    if (!user) {
        throw new not_found_1.default("User account not found");
    }
    const isCorrectPassword = yield bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
        throw new bad_request_1.default("Invalid login credentials");
    }
    const tokenData = {
        id: user.id,
        email,
        fullname: user.fullname
    };
    const token = generateToken(tokenData);
    res.cookie("Token", token);
    res.cookie("Username", user.fullname);
    res.cookie("UserId", user.id);
    // localStorage.setItem("signature", tokenData.id)
    res.status(200).redirect('/dashboard');
    // {User: user}
}));
const handleLogout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("Token", "");
    res.cookie("Username", "");
    res.cookie("UserId", "");
    res.status(200).json({
        message: "User logout successful",
        data: {},
        status: true
    });
}));
module.exports = {
    registerUser,
    handleLogin,
    handleLogout
};
//# sourceMappingURL=auth.controller.js.map