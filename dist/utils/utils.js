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
const fs_1 = __importDefault(require("fs"));
const jwt = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    secret: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER,
    subject: process.env.JWT_SUBJECT,
    expires: process.env.JWT_EXPIRES,
    algorithm: process.env.JWT_ALGORITHM,
};
const writeToFile = (dir, content) => {
    const writer = fs_1.default.createWriteStream(dir);
    writer.write(JSON.stringify(content, null, 2));
};
const generateId = (db) => {
    if (!db.length)
        return 1;
    const id = db[db.length - 1].id + 1;
    return id;
};
const generateToken = (data) => {
    const { id, email, fullname } = data;
    const token = jwt.sign({
        id,
        email,
        fullname
    }, config.secret, {
        issuer: config.issuer,
        expiresIn: 860000,
        algorithm: "HS512",
        subject: config.subject
    });
    return token;
};
module.exports = {
    writeToFile,
    generateId,
    generateToken
};
//# sourceMappingURL=utils.js.map