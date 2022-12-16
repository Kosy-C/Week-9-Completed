"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const method_override_1 = __importDefault(require("method-override"));
// import router from './routes/indexroutes';
const indexroutes_1 = __importDefault(require("./routes/indexroutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const products_routes_1 = __importDefault(require("./routes/products.routes"));
dotenv_1.default.config();
// import dbService from "./database/db";
// dbService()
mongoose_1.default.connect(process.env.Database_Url, () => {
    console.log('using mongodb database');
});
const app = (0, express_1.default)();
app.use('/product', products_routes_1.default);
//view engine setup
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use((0, method_override_1.default)('_method'));
// app.use(router);
app.use(error_handler_1.default);
app.use('/', indexroutes_1.default);
const port = 3005;
app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map