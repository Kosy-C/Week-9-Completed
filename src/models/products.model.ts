// import ModelService from "../services/model.service"
// const productDatabase = require('../../products.json')


// const productModel = new ModelService(productDatabase, "./products.json")

import mongoose, { Schema } from "mongoose";

interface IProducts {
    _id?: number,
    name: string,
   image: string,
    brand: string,
    category: string,
    description: string,
    price: string,
    countInStock: string,
    rating: string,
    numReviews: string,
}

const productSchema = new Schema({
    name: {type: String},
    image: {type: String},
    brand: {type: String},
    category: {type: String},
    description: {type: String},
    price: {type: String},
    countInStock: {type: String},
    rating: {type: String},
    numReviews: {type: String},
})

const Products = mongoose.model<IProducts>("Products", productSchema)

export default Products;