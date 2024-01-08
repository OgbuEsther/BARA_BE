import productModels from "../models/productModels";
import express, { Request, Response } from "express";

const router = express.Router();
import cloudinary from "../utils/cloudinary";
import { uploadProducConfig } from "../utils/multer";



// create product

router.post(
  "/new-product",
  uploadProducConfig,
  async (req: Request, res: Response) => {
    try {
      const {
        title,
        price,
        productImage,
        quantity,
        status,
        desc,
        category,
        oldPrice,
      } = req.body;
      const imgUploader = await cloudinary.uploader.upload(req?.file!.path);
   
    
        const products = await productModels.create({
          title,
          price,
          productImage: imgUploader?.secure_url,
          quantity,
          status: true,
          desc,
          category,
          oldPrice,
        });

    
    
        if (!products) {
          return res.status(201).json({
            message: "couldn't create product",
          });
        } else {
          return res.status(201).json({
            message: "new product added",
            data: products,
          });
        }
      
    } catch (error: any) {
      return res.status(400).json({
        message: "unable to create product",
        data: error,
        errMsg: error.message,
      });
    }
  }
);

//purchasing product



//get all products

router.get("/allproducts", async (req: Request, res: Response) => {
  try {
    const getProducts = await productModels.find().sort({ createdAt: -1 });

    return res.status(200).json({
      messsage: "gotten all products",
      data: getProducts,
    });
  } catch (error) {
    res.status(404).json({
      message: "an error occured",
    });
  }
});

router.get("/allproducts/:id", async (req: Request, res: Response) => {
  try {
    const getProducts = await productModels.findById(req.params.id);

    return res.status(200).json({
      messsage: "gotten all products",
      data: getProducts,
    });
  } catch (error) {
    res.status(404).json({
      message: "an error occured",
    });
  }
});





export default router;
