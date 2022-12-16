import express from "express";
const authRouter = express.Router();
import validateUserData from "../middleware/validate-user-data";
import validateLogin from "../middleware/validate-login";
const { registerUser, handleLogin, handleLogout } = require("../controllers/auth.controller")
import * as Product from "../controllers/products.controller"
const productRouter = express.Router();


productRouter.get('/', Product.getProducts)
authRouter.post('/register', validateUserData, registerUser);
authRouter.post('/login', validateLogin, handleLogin)
authRouter.get('/logout', handleLogout)

authRouter.get('/login',  (req, res) => {
        res.render("login", {Login: 'login'})
})
authRouter.get('/register',  (req, res) => {
    res.render("signup", {SignUp: 'signup'})
})

// authRouter.get('/dashboard', (req, res) => {
//     res.render("dashboard",  {Dashboard: "dashboard"})
// })

export default authRouter;