"use strict";
// import { Request, Response } from "express";
// import expressAsyncHandler from "express-async-handler";
// import ModelService from "../models/model.service";
// import { IUser } from '../../typings.d';
// const  generateToken = require("../utils/utils");
// const bcrypt = require("bcryptjs");
// const userDatabase = require('../../users.json')
// const userModel = new ModelService(userDatabase, "./users.json")
// const registerUser = expressAsyncHandler(async(req: Request, res: Response) => {
//     const { password } = req.body
//     const userExists = await userModel.findOne({email: req.body.email})
//     if (userExists) {
//         res.status(400)
//         throw new Error("User account exists already")
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     req.body.password = hashedPassword
//     delete req.body.confirm_password
//     const user = await userModel.create(req.body) as IUser
//     delete user.password 
//     /*we deleted our password so that when we register our user, the password won't show on the dashboard, 
//     same with the confirm_password.But then, the password is still active under the hood */
//     res.status(201).json({ message: "User created successfully", data: { user }, status: true })
// })
// const handleLogin = expressAsyncHandler(async(req: Request, res: Response)=>{
//     const { email, password } = req.body;
// /* destructure the email & password from the req.body bcos the middleware ensures that it'll be provided & our req.body is in form of an object*/
//     const user = await userModel.findOne({ email }) as IUser
//     if(!user) {
//         res.status(400)
//         throw new Error("User account not found")
//     }
//     const IsCorrectPassword = await bcrypt.compare(password, user.password);
// /* compare is a bcrypt mthd that checks if the hashed password(user.password) is same with the password the user inputs*/
//     if(!IsCorrectPassword) {
//         res.status(400)
//         throw new Error("Invalid login credentials")
//     }
//     const tokenData: Record<string, any> = {
//         id: user.id,
//         email,
//         fullname: user.fullname
//     }
// /* combination of line 47-51 makes a single payload*/
//     const token = generateToken(tokenData) as string;
//     res.cookie("Token", token)       /*"Token is the string while token is the value*/ 
//     res.cookie("Username", user.fullname)
//     res.cookie("UserId", user.id)
// /*line 55-58 is exactly what we're expecting when the user logins in, the generated token is stored here(in the token)*/
//     res.status(200). json({
//         message: "User login successful",
//         data: {
//             token
//         },
//         status: true
//     })
// })
// /* it is when the user logs in, that's when (s)he will be authorized to access the site/products*/
// /* tokenData is what we also call the payload */
// const handleLogout = expressAsyncHandler(async(req: Request, res: Response) =>{
//     res.cookie("Token", "")
//     res.cookie("Username", "")
//     res.cookie("UserId", "")
//     res.status(200).json({
//         message: "User logout successful",
//         data: {
//         },
//         status: true
//     })
// })
// module.exports = {
//     registerUser,
//     handleLogin,
//     handleLogout
// }
//# sourceMappingURL=users.controller.js.map