// import ModelService from "../services/model.service"
// const userDatabase = require('../../users.json')

// const userModel = new ModelService(userDatabase, "./users.json")
import mongoose, { Schema } from "mongoose";

interface IUser {
    _id?: number,
    fullname: string,
    email: string  
    gender:string,
    phone:number,
    password?: number,
    address:string,  
}

const userSchema = new Schema({
    fullname: {type: String},
    email: {type: String},
    gender: {type: String},
    phone: {type: String},
    password: {type: String},
    address: {type: String}  
})

const UserDb = mongoose.model<IUser>("UserDb", userSchema)

export default UserDb;