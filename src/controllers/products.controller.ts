import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Products from "../models/products.model";
import BadRequestError from "../errors/bad-request";
import { upload } from "../utils/multer";
// import { IProducts } from "../../typings.d"

// upload

export const addProduct = expressAsyncHandler(
  async (req: Request | any, res: Response) => {
    const {
      name,
      brand,
      category,
      description,
      price,
      countInStock,
      rating,
      numReviews,
      image
    } = req.body;

    const product = await Products.create({
      name,
      image:req.file.path,
      brand,
      category,
      description,
      price,
      countInStock,
      rating,
      numReviews,
    });
    // res.status(201).render("dashboard", { prods: product })
    res.status(201).redirect("/dashboard")
    
    // json({
    //   message: "Product successfully added",
    //   data: {
    //     product,
    //   },
    //   status: true,
    // });
  }
);

export const getProducts = async (req: Request, res: Response) => {
    try{
        let pageNum = Number(req.query.pageNum) || 0;
        console.log(pageNum);
        const products = await Products.find({}).limit(5).skip(pageNum * 5);
        // const products = await Products.find()
        const noOfPages = (await Products.find({}).count())/5;
        if(products){
            res.status(200).render("index", { prods: products, noOfPages })
        }else{
            res.status(400).json({
              message: "All products failed to retrieve"
            });
        }
      }catch(err){
        console.log(err)
        res.status(500).json({
            message: "Internal Server Error",
            route:'/'
          })
      }
  }

export const dashboardGetProducts = async (req: Request, res: Response) => {
  try{
      const products = await Products.find({});
      console.log("products");
      
      if(products){
          res.status(200).render("dashboard.ejs", { products: products })
      }else{
          res.status(400).json({
            message: "All products failed to retrieve"
          });
      }
    }catch(err){
      console.log(err)
      res.status(500).json({
          message: "Internal Server Error",
          route:'/'
        })
    }
}


export const getProductById = async (req: Request, res: Response) => {
        const _id = req.params._id
    const product = await Products.findOne({_id:_id});

    if (!product) {
      throw new BadRequestError("Product not found");
    }
    res.status(200).render('product', {product:product});
  }


export const updateProductById = 
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = await Products.findOne({ id });

    if (!product) {
      throw new BadRequestError("Product not found");
    }

    req.body.price = `N${req.body.price}`;
    const updatedProduct = await Products.findByIdAndUpdate(
      { id },
      { id, ...req.body }
    );

    res.status(200).json({
      message: `Product with id ${id} updated successfully`,
      data: {
        updatedProduct,
      },
      status: true,
    });
  }


export const deleteProductById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = await Products.findOne({ id });

    if (!product) {
      throw new BadRequestError("Product not found");
    }

    await Products.findByIdAndDelete({ id });

    res.status(200).json({
      message: `Product with id ${id} deleted successfully`,
      data: {},
      status: true,
    });
  }

